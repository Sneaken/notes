# dotenv

## 1. 前情提要

### 1.1 介绍

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing
configuration in the environment separate from code is based on The Twelve-Factor App methodology.

### 1.2 解析规则

The parsing engine currently supports the following rules:

- `BASIC=basic` becomes `{BASIC: 'basic'}`
- empty lines are skipped
- lines beginning with `#` are treated as comments 所以是支持单行注释
- whitespace followed by `#` marks the beginning of an inline comment (unless when the value is wrapped in quotes)
  所以是支持尾注释
- empty values become empty strings (`EMPTY=` becomes `{EMPTY: ''}`)
- inner quotes are maintained (think JSON) (`JSON={"foo": "bar"}` becomes `{JSON:"{\"foo\": \"bar\"}"`)
- whitespace is removed from both ends of unquoted values (see more
  on [`trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)) (`FOO= some value  `
  becomes `{FOO: 'some value'}`)
- single and double quoted values are escaped (`SINGLE_QUOTE='quoted'` becomes `{SINGLE_QUOTE: "quoted"}`)
- single and double quoted values maintain whitespace from both ends (`FOO="  some value  "`
  becomes `{FOO: '  some value  '}`)
- double quoted values expand new lines (`MULTILINE="new\nline"` becomes

```
{MULTILINE: 'new
line'}
```

## 2. 源码解析

### 2.1 工具函数 resolveHome

```js
function resolveHome (envPath) {
  // 就是把 '~' 更换为了 home目录
  // for example: ~/code => /Users/sneaken/Code
  // homedir 因 平台 而 异
  return envPath[0] === '~' ? path.join(os.homedir(), envPath.slice(1)) : envPath
}
```

### 2.2 config

> 读取变量并挂载到 process.env 上

```js
// Populates process.env from .env file
function config (options) {
  // 默认为项目根目录的 env 文件
  let dotenvPath = path.resolve(process.cwd(), '.env')
  // 默认编码 utf-8
  let encoding = 'utf8'
  // 是否开启 debug 模式
  const debug = Boolean(options && options.debug)
  // 变量是否需要覆盖
  const override = Boolean(options && options.override)
  // 是否开启多行解析（一个变量可能为多行）
  // for example: git_pub="....
  // ....
  // ...."
  const multiline = Boolean(options && options.multiline)

  if (options) {
    if (options.path != null) {
      // 更换实际 env 文件路径
      dotenvPath = resolveHome(options.path)
    }
    if (options.encoding != null) {
      // 更换编码
      encoding = options.encoding
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    // 解析文件参数
    const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }), { debug, multiline })

    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        // 如果 process.env 上面不存在 [key]， 则挂上去
        process.env[key] = parsed[key]
      } else {
        // 如果 存在这个 [key]

        // 是否需要覆盖
        if (override === true) {
          process.env[key] = parsed[key]
        }

        // 如果开启了 debug 模式，则打印对应的日志
        if (debug) {
          if (override === true) {
            log(`"${key}" is already defined in \`process.env\` and WAS overwritten`)
          } else {
            log(`"${key}" is already defined in \`process.env\` and was NOT overwritten`)
          }
        }
      }
    })

    // 返回解析的内容
    return { parsed }
  } catch (e) {
    // 出现异常打印对应信息
    if (debug) {
      log(`Failed to load ${dotenvPath} ${e.message}`)
    }

    return { error: e }
  }
}
```

### 2.3 parse

> 变量解析函数

```js
const NEWLINE = '\n'
// 正则 key=val 形式
// 可以观察到 key 在取值时，已经去掉了开头结尾的空格
// \w: 匹配包括下划线的任何单词字符 等价于 [A-Z a-z 0-9_]
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*("[^"]*"|'[^']*'|.*?)(\s+#.*)?$/
const RE_NEWLINES = /\\n/g
// 行分割符 windows: \r\n  Classic Mac Os: \r  [一般性自己显式输入的话]: \n
const NEWLINES_MATCH = /\r\n|\n|\r/

// Parses src into an Object
function parse (src, options) {
  // 是否开启 debug 模式
  const debug = Boolean(options && options.debug)
  // 是否开启多行解析（一个变量可能为多行）
  const multiline = Boolean(options && options.multiline)
  // 结果挂载 在 obj 上
  const obj = {}

  // convert Buffers before splitting into lines and processing
  // 为什么需要使用 toString() ?
  // 因为 src 可能是一个 Buffer 对象
  // 如果你想看到src 里面的 \n 字符 打印的时候包在一个对象里面即可
  // for example: console.log({ src });
  const lines = src.toString().split(NEWLINES_MATCH)

  for (let idx = 0; idx < lines.length; idx++) {
    let line = lines[idx]

    // matching "KEY' and 'VAL' in 'KEY=VAL'
    const keyValueArr = line.match(RE_INI_KEY_VAL)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1]
      // default undefined or missing values to empty string
      let val = (keyValueArr[2] || '')
      let end = val.length - 1
      // 单行变量双引号
      const isDoubleQuoted = val[0] === '"' && val[end] === '"'
      // 单行变量单引号
      const isSingleQuoted = val[0] === "'" && val[end] === "'"

      // 多行变量双引号  开头是双引号 结尾不是双引号
      const isMultilineDoubleQuoted = val[0] === '"' && val[end] !== '"'
      // 多行变量单引号 开头是单引号 结尾不是单引号
      const isMultilineSingleQuoted = val[0] === "'" && val[end] !== "'"

      // if parsing line breaks and the value starts with a quote
      if (multiline && (isMultilineDoubleQuoted || isMultilineSingleQuoted)) {
        const quoteChar = isMultilineDoubleQuoted ? '"' : "'"

        // 去掉开头的引号
        val = val.substring(1)

        while (idx++ < lines.length - 1) {
          line = lines[idx]
          end = line.length - 1
          if (line[end] === quoteChar) {
            // 匹配结束 去掉结尾的引号
            val += NEWLINE + line.substring(0, end)
            break
          }
          // 从这可以看出 若是引号没配对成功， 那么从这个值开始以后的内容都会变成这个值的val
          val += NEWLINE + line
        }
        // if single or double quoted, remove quotes
      } else if (isSingleQuoted || isDoubleQuoted) {
        // 去掉两边的引号
        val = val.substring(1, end)

        // EXPAND_NEWLINES="expand\nnew\nlines"
        // DONT_EXPAND_UNQUOTED=dontexpand\nnewlines
        // DONT_EXPAND_SQUOTED='dontexpand\nnewlines'

        // if double quoted, expand newlines
        if (isDoubleQuoted) {
          // 根据结果来看 带双引号的 \n 不会被转义
          val = val.replace(RE_NEWLINES, NEWLINE)
        }
      } else {
        // remove surrounding whitespace
        // 如果不是以 配对的单双引号包裹，则移除 val 开头结尾的空格
        val = val.trim()
      }

      // 赋值
      obj[key] = val
    } else if (debug) {
      const trimmedLine = line.trim()

      // 当是 `#` 开头时 当作是注释处理， 其余当作解析失败
      // ignore empty and commented lines
      if (trimmedLine.length && trimmedLine[0] !== '#') {
        log(`Failed to match key and value when parsing line ${idx + 1}: ${line}`)
      }
    }
  }

  return obj
}
```

## 3. 额外知识

### 3.1 package.json 中的 exports 字段设置

> [package-exports](https://webpack.js.org/guides/package-exports/)

The `exports` field in the package.json of a package allows declaring which module should be used when using module
requests like import "package" or import "package/sub/path". It replaces the default implementation that returns main
field resp. index.js files for "package" and the file system lookup for "package/sub/path".

When the `exports` field is specified, only these module requests are available. Any other requests will lead to a
ModuleNotFound Error.

#### 3.1.1 allow sb. to do sth.

> 允许某人做某事。

注：有时用于被动语态。如：

Passengers are not allowed to smoke. 乘客不准吸烟。

从语态上来区别：to do只能当allow用在被动语态的时候才能用，也就是只能是这种形式：

#### 3.1.2 allow doing sth.

> 允许做某事。

### 3.2 关于导出（请大佬赐教啊）

```js
// 场景一

// Dotenv Module
const DotenvModule = {
  config,
  parse
}

module.exports = DotenvModule

// test.js
import { parse } from 'dotenv';
// 这种情况下 esm 会报错
// 所以为什么会报错呢····
```

```js
// 场景二

// Dotenv Module
const DotenvModule = {
  config,
  parse
}

module.exports.config = DotenvModule.config
module.exports.parse = DotenvModule.parse
module.exports = DotenvModule

// test.js
import { parse } from 'dotenv';
// 这种情况下 esm 不会报错
```
