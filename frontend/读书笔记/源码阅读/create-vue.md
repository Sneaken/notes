# create-vue

## 1. 前情提要

### 1.1 package.json 分析

```json5
{
  "type": "module", // 表示整个项目是基于 es module 开发的
  "bin": {
    "create-vue": "outfile.cjs" // 可执行命令
  },
  "files": [
    "outfile.cjs",
    "template"
  ], // 安装包的时候显示的文件(夹)
  "engines": {
    "node": "^12.13.0 || ^14.0.0 || >= 16.0.0" // 规定 node 环境
  },
  "scripts": {
    "build": "esbuild --bundle index.js --format=cjs --platform=node --outfile=outfile.cjs",
    "snapshot": "node snapshot.js",
    "pretest": "run-s build snapshot", // This command is the shorthand of npm-run-all -s
    "prepublishOnly": "run-s build snapshot" // 相当于 npm run build && npm run snapshot
  },
  "devDependencies": {
    "esbuild": "^0.12.29",
    "husky": "^7.0.2",
    "kolorist": "^1.5.0",
    "lint-staged": "^11.2.0",
    "minimist": "^1.2.5",
    "npm-run-all": "^4.1.5",
    "prettier": "^2.4.1",
    "prompts": "^2.4.1"
  },
}

```


## 2. 源码解析

## 2.1 工具函数

### 2.1.1 遍历目录

```js
import fs from 'fs'
import path from 'path'

export function preOrderDirectoryTraverse (dir, dirCallback, fileCallback) {
  for (const filename of fs.readdirSync(dir)) {
    const fullpath = path.resolve(dir, filename)
    if (fs.lstatSync(fullpath).isDirectory()) {
      dirCallback(fullpath)
      // in case the dirCallback removes the directory entirely
      if (fs.existsSync(fullpath)) {
        preOrderDirectoryTraverse(fullpath, dirCallback, fileCallback)
      }
      continue
    }
    fileCallback(fullpath)
  }
}

export function postOrderDirectoryTraverse (dir, dirCallback, fileCallback) {
  for (const filename of fs.readdirSync(dir)) {
    const fullpath = path.resolve(dir, filename)
    // 判断 fullpath 是否是目录
    // 需要注意的是：当 fullpath 不存在是会抛出异常。此处不存在这种情况
    if (fs.lstatSync(fullpath).isDirectory()) {
      // 递归处理
      postOrderDirectoryTraverse(fullpath, dirCallback, fileCallback)
      // 结束后执行 dirCallback 回调
      dirCallback(fullpath)
      continue
    }
    // 不是目录则执行 fileCallback 回调
    fileCallback(fullpath)
  }
}
```

### 2.1.2 清空目录

```js
// 清空目录下的文件
function emptyDir (dir) {
  // 后续遍历目录
  postOrderDirectoryTraverse(
    dir,
    // 目录回调：删除目录
    (dir) => fs.rmdirSync(dir),
    // 文件回调： 直接删除文件或符号链接(软链接)
    (file) => fs.unlinkSync(file)
  )
}
```

### 2.1.3 deepMerge

```js
// 简易判断是否是对象
const isObject = (val) => val && typeof val === 'object'
// 数组去重
const mergeArrayWithDedupe = (a, b) => Array.from(new Set([...a, ...b]))

/**
 * Recursively merge the content of the new object to the existing one
 * @param {Object} target the existing object
 * @param {Object} obj the new object
 */
function deepMerge (target, obj) {
  for (const key of Object.keys(obj)) {
    const oldVal = target[key]
    const newVal = obj[key]

    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      // 都是数组的话，合并去重
      target[key] = mergeArrayWithDedupe(oldVal, newVal)
    } else if (isObject(oldVal) && isObject(newVal)) {
      // 都是对象的话递归合并
      target[key] = deepMerge(oldVal, newVal)
    } else {
      // 没有就赋予新值
      target[key] = newVal
    }
  }

  return target
}

export default deepMerge
```

### 2.1.4 sortDependencies

```js
export default function sortDependencies (packageJson) {
  const sorted = {}

  // 对以下的内容进行排序
  const depTypes = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies']

  for (const depType of depTypes) {
    if (packageJson[depType]) {
      sorted[depType] = {}

      Object.keys(packageJson[depType])
        .sort()
        .forEach((name) => {
          sorted[depType][name] = packageJson[depType][name]
        })
    }
  }

  return {
    ...packageJson,
    ...sorted
  }
}
```

### 2.1.5 渲染模板

```js
import fs from 'fs'
import path from 'path'

import deepMerge from './deepMerge.js'
import sortDependencies from './sortDependencies.js'

/**
 * Renders a template folder/file to the file system,
 * by recursively copying all files under the `src` directory,
 * with the following exception:
 *   - `_filename` should be renamed to `.filename`
 *   - Fields in `package.json` should be recursively merged
 * @param {string} src source filename to copy
 * @param {string} dest destination filename of the copy operation
 */
function renderTemplate (src, dest) {
  const stats = fs.statSync(src)

  if (stats.isDirectory()) {
    // if it's a directory, render its subdirectories and files recusively
    // 递归创建目录
    fs.mkdirSync(dest, { recursive: true })
    for (const file of fs.readdirSync(src)) {
      renderTemplate(path.resolve(src, file), path.resolve(dest, file))
    }
    return
  }

  const filename = path.basename(src)

  if (filename === 'package.json' && fs.existsSync(dest)) {
    // merge instead of overwriting
    const existing = JSON.parse(fs.readFileSync(dest))
    const newPackage = JSON.parse(fs.readFileSync(src))
    const pkg = sortDependencies(deepMerge(existing, newPackage))
    fs.writeFileSync(dest, JSON.stringify(pkg, null, 2) + '\n')
    return
  }

  // 将文件修改成 dot file
  // 以'_'开头这个属于约定式
  if (filename.startsWith('_')) {
    // rename `_file` to `.file`
    dest = path.resolve(path.dirname(dest), filename.replace(/^_/, '.'))
  }

  // 复制文件
  fs.copyFileSync(src, dest)
}

export default renderTemplate
```

### 2.1.6 getCommand

```js
export default function getCommand (packageManager, scriptName) {
  if (scriptName === 'install') {
    // return `${packageManager} install` 亦可。
    return packageManager === 'yarn' ? 'yarn' : `${packageManager} install`
  }

  return packageManager === 'npm' ? `npm run ${scriptName}` : `${packageManager} ${scriptName}`
}
```

### 2.1.7 canSafelyOverwrite

```js
function canSafelyOverwrite (dir) {
  // 如果 dir 不存在 或者 dir 下面没有内容， 就可以安全删除 dir
  return !fs.existsSync(dir) || fs.readdirSync(dir).length === 0
}
```

## 2.2 主函数

```js
async function init () {
  const cwd = process.cwd()
  // possible options:
  // --default
  // --typescript / --ts
  // --jsx
  // --router / --vue-router
  // --vuex
  // --with-tests / --tests / --cypress
  // --force (for force overwriting)
  const argv = minimist(process.argv.slice(2), {
    // 声明别称
    alias: {
      typescript: ['ts'],
      'with-tests': ['tests', 'cypress'],
      router: ['vue-router']
    },
    // all arguments are treated as booleans
    boolean: true
  })

  // if any of the feature flags is set, we would skip the feature prompts
  // use `??` instead of `||` once we drop Node.js 12 support
  const isFeatureFlagsUsed =
    typeof (argv.default || argv.ts || argv.jsx || argv.router || argv.vuex || argv.tests) ===
    'boolean'

  // argv._ 包含所有没有关联选项的参数
  // 约定其中一个位置为项目地址
  let targetDir = argv._[0]
  const defaultProjectName = !targetDir ? 'vue-project' : targetDir

  const forceOverwrite = argv.force

  let result = {}

  try {
    // Prompts:
    // - Project name:
    //   - whether to overwrite the existing directory or not?
    //   - enter a valid package name for package.json
    // - Project language: JavaScript / TypeScript
    // - Add JSX Support?
    // - Install Vue Router for SPA development?
    // - Install Vuex for state management? (TODO)
    // - Add Cypress for testing?
    result = await prompts(
      [
        {
          name: 'projectName',
          type: targetDir ? null : 'text',
          message: 'Project name:',
          initial: defaultProjectName,
          onState: (state) => (targetDir = String(state.value).trim() || defaultProjectName)
        },
        {
          name: 'shouldOverwrite',
          type: () => (canSafelyOverwrite(targetDir) || forceOverwrite ? null : 'confirm'),
          message: () => {
            const dirForPrompt =
              targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`

            return `${dirForPrompt} is not empty. Remove existing files and continue?`
          }
        },
        {
          name: 'overwriteChecker',
          type: (prev, values = {}) => {
            if (values.shouldOverwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled')
            }
            return null
          }
        },
        {
          name: 'packageName',
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          message: 'Package name:',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name'
        },
        {
          name: 'needsTypeScript',
          type: () => (isFeatureFlagsUsed ? null : 'toggle'),
          message: 'Add TypeScript?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsJsx',
          type: () => (isFeatureFlagsUsed ? null : 'toggle'),
          message: 'Add JSX Support?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsRouter',
          type: () => (isFeatureFlagsUsed ? null : 'toggle'),
          message: 'Add Vue Router for Single Page Application development?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsVuex',
          type: () => (isFeatureFlagsUsed ? null : 'toggle'),
          message: 'Add Vuex for state management?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsTests',
          type: () => (isFeatureFlagsUsed ? null : 'toggle'),
          message: 'Add Cypress for testing?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        }
      }
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    process.exit(1)
  }

  // `initial` won't take effect if the prompt type is null
  // so we still have to assign the default values here
  const {
    packageName = toValidPackageName(defaultProjectName),
    shouldOverwrite,
    needsJsx = argv.jsx,
    needsTypeScript = argv.typescript,
    needsRouter = argv.router,
    needsVuex = argv.vuex,
    needsTests = argv.tests
  } = result
  const root = path.join(cwd, targetDir)

  if (shouldOverwrite) {
    // 需要重写的话，则清空 root 目录
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    // 如果 root 不存在， 则创建目录
    fs.mkdirSync(root)
  }

  console.log(`\nScaffolding project in ${root}...`)

  
  // 创建 package.json
  const pkg = { name: packageName, version: '0.0.0' }
  fs.writeFileSync(path.resolve(root, 'package.json'), JSON.stringify(pkg, null, 2))

  // todo:
  // work around the esbuild issue that `import.meta.url` cannot be correctly transpiled
  // when bundling for node and the format is cjs
  // const templateRoot = new URL('./template', import.meta.url).pathname
  const templateRoot = path.resolve(__dirname, 'template')
  const render = function render (templateName) {
    const templateDir = path.resolve(templateRoot, templateName)
    renderTemplate(templateDir, root)
  }

  // 渲染基础模板
  // Render base template
  render('base')

  // 动态的添加一些配置
  // Add configs.
  if (needsJsx) {
    render('config/jsx')
  }
  if (needsRouter) {
    render('config/router')
  }
  if (needsVuex) {
    // vuex 比较特殊，从结构来看 config/vuex 只应该存在 package.json
    render('config/vuex')
  }
  if (needsTests) {
    render('config/cypress')
  }
  if (needsTypeScript) {
    render('config/typescript')
  }

  // 复制代码模板
  // Render code template.
  // prettier-ignore
  const codeTemplate =
    (needsTypeScript ? 'typescript-' : '') +
    (needsRouter ? 'router' : 'default')
  render(`code/${codeTemplate}`)

  // 复制入口文件
  // Render entry file (main.js/ts).
  if (needsVuex && needsRouter) {
    render('entry/vuex-and-router')
  } else if (needsVuex) {
    render('entry/vuex')
  } else if (needsRouter) {
    render('entry/router')
  } else {
    render('entry/default')
  }

  // Cleanup.
  // 清理程序，将涉及到的 ts 转换成正确的文件

  if (needsTypeScript) {
    // rename all `.js` files to `.ts`
    // rename jsconfig.json to tsconfig.json
    preOrderDirectoryTraverse(
      root,
      () => {},
      (filepath) => {
        if (filepath.endsWith('.js')) {
          fs.renameSync(filepath, filepath.replace(/\.js$/, '.ts'))
        } else if (path.basename(filepath) === 'jsconfig.json') {
          fs.renameSync(filepath, filepath.replace(/jsconfig\.json$/, 'tsconfig.json'))
        }
      }
    )

    // Rename entry in `index.html`
    const indexHtmlPath = path.resolve(root, 'index.html')
    const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8')
    fs.writeFileSync(indexHtmlPath, indexHtmlContent.replace('src/main.js', 'src/main.ts'))
  }

  if (!needsTests) {
    // All templates assumes the need of tests.
    // If the user doesn't need it:
    // rm -rf cypress **/__tests__/
    preOrderDirectoryTraverse(
      root,
      (dirpath) => {
        const dirname = path.basename(dirpath)

        if (dirname === 'cypress' || dirname === '__tests__') {
          emptyDir(dirpath)
          fs.rmdirSync(dirpath)
        }
      },
      () => {}
    )
  }

  // Instructions:
  // Supported package managers: pnpm > yarn > npm
  // Note: until <https://github.com/pnpm/pnpm/issues/3505> is resolved,
  // it is not possible to tell if the command is called by `pnpm init`.
  const packageManager = /pnpm/.test(process.env.npm_execpath)
    ? 'pnpm'
    : /yarn/.test(process.env.npm_execpath)
      ? 'yarn'
      : 'npm'

  // README generation
  fs.writeFileSync(
    path.resolve(root, 'README.md'),
    generateReadme({
      projectName: result.projectName || defaultProjectName,
      packageManager,
      needsTypeScript,
      needsTests
    })
  )

  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    console.log(`  ${bold(green(`cd ${path.relative(cwd, root)}`))}`)
  }
  console.log(`  ${bold(green(getCommand(packageManager, 'install')))}`)
  console.log(`  ${bold(green(getCommand(packageManager, 'dev')))}`)
  console.log()
}
```

## 2.3 snapshot(生成所有的模板)

```js
import { spawnSync } from 'child_process'
import path from 'path'


// 处理 es moudle 下不能直接使用 __dirname 的问题
const __dirname = path
  .dirname(new URL(import.meta.url).pathname)
  .substring(process.platform === 'win32' ? 1 : 0)

const bin = path.resolve(__dirname, './outfile.cjs')
const playgroundDir = path.resolve(__dirname, './playground/')

// 根据功能的flag来创建项目
function createProjectWithFeatureFlags(flags) {
  const projectName = flags.join('-')
  console.log(`Creating project ${projectName}`)
  const { status } = spawnSync(
    'node',
    [bin, projectName, ...flags.map((flag) => `--${flag}`), '--force'],
    {
      cwd: playgroundDir,
      stdio: ['pipe', 'pipe', 'inherit']
    }
  )

  if (status !== 0) {
    process.exit(status)
  }
}

const featureFlags = ['typescript', 'jsx', 'router', 'vuex', 'with-tests']

// 获取全排列可能
// The following code & comments are generated by GitHub CoPilot.
function fullCombination(arr) {
  const combinations = []

  // for an array of 5 elements, there are 2^5 - 1= 31 combinations
  // (excluding the empty combination)
  // equivalent to the following:
  // [0, 0, 0, 0, 1] ... [1, 1, 1, 1, 1]
  // We can represent the combinations as a binary number
  // where each digit represents a flag
  // and the number is the index of the flag
  // e.g.
  // [0, 0, 0, 0, 1] = 0b0001
  // [1, 1, 1, 1, 1] = 0b1111

  // Note we need to exclude the empty comination in our case
  // 1 << n 等价于 2 * n
  for (let i = 1; i < 1 << arr.length; i++) {
    const combination = []
    for (let j = 0; j < arr.length; j++) {
      if (i & (1 << j)) {
        combination.push(arr[j])
      }
    }
    combinations.push(combination)
  }

  return combinations
}

const flagCombinations = fullCombination(featureFlags)
flagCombinations.push(['default'])

for (const flags of flagCombinations) {
  createProjectWithFeatureFlags(flags)
}
```

## 3. 额外知识

### 3.1 fs.lstatSync(fullpath).isDirectory()

如果 `fullpath` 不存在的话，会抛出异常，使用的时候需要注意下异常处理

### 3.2 关于 package.json 中 type 字段的含义

1. type 字段的产生用于定义 package.json 文件和该文件所在目录根目录中.js 文件和无拓展名文件的处理方式。值为`module`则当作 es 模块处理；值为`commonjs`则被当作 commonJs 模块处理
2. 目前 node 默认的是如果 package.json 没有定义 type 字段，则按照 commonJs 规范处理
3. node 官方建议包的开发者明确指定 package.json 中 type 字段的值
4. 无论 package.json 中的 type 字段为何值，.mjs 的文件都按照 es 模块来处理，.cjs 的文件都按照 commonJs 模块来处理

### 3.3 \_\_dirname is not defined in ES module scope

> https://github.com/nodejs/help/issues/2907 > https://nodejs.org/dist/latest-v16.x/docs/api/esm.html#no-__filename-or-__dirname

```js
// __dirname 和 __filename 是 CommonJS 变量, 必然不可能在 es module 中使用

// 将 __dirname 和 __filename 转化为 es module 可以使用的变量
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
```
