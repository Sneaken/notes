# validate-npm-package-name

## 介绍

包如其名 validate npm package name，校验 npm 包的名字是否符合规范

### 规范来自哪里？

你会发现这个包是属于 npm 组织下的， 所以这其实就是官方规范。

## 依赖

### dependencies

1. [builtins](https://github.com/juliangruber/builtins)

~~根据当前的 node 环境，返回内置模块里面的核心模块, 注意：不是全部的内置模块~~

项目里的版本属于旧版 是一个 json 文件 (意思是后出来的核心模块不管了？)

### devDependencies

1. [standard](https://github.com/standard/standard/blob/master/docs/README-zhcn.md)

代码检查以及格式化工具，开箱即用

2. [tap](https://github.com/tapjs/node-tap)

一款 node 的 测试框架

## 源码

```js
'use strict';

// 正则啊 学了忘 忘了学 太难了
// ?: 非捕获分组  只匹配， 不捕获，节省内存
// ^ 不放在开头表示非的意思  [^/1234] 表示不包含 '/' | '1' | '2' | '3' | '4'
// scoped 可有可无
var scopedPackagePattern = new RegExp('^(?:@([^/]+?)[/])?([^/]+?)$');
var builtins = require('builtins');

// 黑名单（~~我喜欢保留字这个翻译~~但是放在这里不符合语境）
var blacklist = ['node_modules', 'favicon.ico'];

var validate = (module.exports = function (name) {
  var warnings = [];
  var errors = [];

  if (name === null) {
    errors.push('name cannot be null');
    return done(warnings, errors);
  }

  if (name === undefined) {
    errors.push('name cannot be undefined');
    return done(warnings, errors);
  }

  if (typeof name !== 'string') {
    errors.push('name must be a string');
    return done(warnings, errors);
  }

  // 以上三个问题看来是不能被容忍的，直接报错退出

  if (!name.length) {
    errors.push('name length must be greater than zero');
  }

  if (name.match(/^\./)) {
    errors.push('name cannot start with a period');
  }

  if (name.match(/^_/)) {
    errors.push('name cannot start with an underscore');
  }

  if (name.trim() !== name) {
    errors.push('name cannot contain leading or trailing spaces');
  }

  // No funny business
  blacklist.forEach(function (blacklistedName) {
    if (name.toLowerCase() === blacklistedName) {
      errors.push(blacklistedName + ' is a blacklisted name');
    }
  });

  // Generate warnings for stuff that used to be allowed

  // core module names like http, events, util, etc
  builtins.forEach(function (builtin) {
    if (name.toLowerCase() === builtin) {
      warnings.push(builtin + ' is a core module name');
    }
  });

  // really-long-package-names-------------------------------such--length-----many---wow
  // the thisisareallyreallylongpackagenameitshouldpublishdowenowhavealimittothelengthofpackagenames-poch.
  if (name.length > 214) {
    warnings.push('name can no longer contain more than 214 characters');
  }

  // mIxeD CaSe nAMEs
  if (name.toLowerCase() !== name) {
    warnings.push('name can no longer contain capital letters');
  }

  // 这边取的实际上是包名（不包含组织名）
  if (/[~'!()*]/.test(name.split('/').slice(-1)[0])) {
    warnings.push('name can no longer contain special characters ("~\'!()*")');
  }

  if (encodeURIComponent(name) !== name) {
    // Maybe it's a scoped package name, like @user/package
    var nameMatch = name.match(scopedPackagePattern);
    if (nameMatch) {
      var user = nameMatch[1];
      var pkg = nameMatch[2];
      if (encodeURIComponent(user) === user && encodeURIComponent(pkg) === pkg) {
        return done(warnings, errors);
      }
    }
    // 所以不符合上面那个这正则的以及在 user 和 pkg 上面玩骚操作的都被报错了。
    errors.push('name can only contain URL-friendly characters');
  }

  return done(warnings, errors);
});

// 正则挂出去的意义何在
validate.scopedPackagePattern = scopedPackagePattern;

var done = function (warnings, errors) {
  var result = {
    // 一般用该属性来判断一个包名是否合法
    // 从这看来 warnings 是后加的
    validForNewPackages: errors.length === 0 && warnings.length === 0,
    // 这个属性是用于兼容最开始node package name带来的遗留问题，那个时候有些包名不规范
    validForOldPackages: errors.length === 0,
    // 以下是具体的警告和错误信息。
    warnings: warnings,
    errors: errors,
  };
  // 保持干净整洁
  if (!result.warnings.length) delete result.warnings;
  if (!result.errors.length) delete result.errors;
  return result;
};
```

## 校验规则

1. 包名必须是字符串(强制规则)
2. 包名不能为空(强制规则)
3. 包名不能以 `.`,`_`开头, 前后不能有空格, 不能过长(<=214 个字符), 必须为小写, 包名(不包括组织名)不支持特殊符号`~'!()*`
4. 包名不能和内置的黑名单一致(目前黑名单只有 node_modules, favicon.ico)
5. 包名不能和 node 内置的核心模块一致
6. 包名应该只含有 URL-friendly 字符

## 拓展知识

### 1. 什么是 URL-friendly

真是一种抽象的概念。（可以寻思下 friendly 是对谁来说的， 对人，对爬虫？）

[on-page-seo-basics-urls](https://www.semrush.com/blog/on-page-seo-basics-urls/?kw=&cmp=US_SRCH_DSA_Blog_Core_BU_EN&label=dsa_pagefeed&Network=g&Device=c&utm_content=515771356525&kwid=dsa-1053501814307&cmpid=11769537497&agpid=117335009191&BU=Core&extid=167368304622&adpos=&gclid=EAIaIQobChMIo9_Ape-j8wIViG5vBB392AwDEAAYASAAEgIX5vD_BwE)

### 2. 关于 scripts 里面 的 TAP_FLAGS 是什么？

```json
{
  "cov:test": "TAP_FLAGS='--cov' npm run test:code",
  "test:code": "tap ${TAP_FLAGS:-'--'} test/*.js"
}
```

这边其实是 shell 的 语法

```bash
${TAP_FLAGS:-'--'} # 相当于 `${TAP_FLAGS || '--'}`
```

~~RNM 退钱。~~ 还是我格局小了。

#### --cov 干吗的？

[node-tap/cli](https://node-tap.org/docs/cli/)

--cov --coverage

Capture coverage information using 'nyc' This is
enabled by default.

If a COVERALLS_REPO_TOKEN environment variable is set, then coverage is sent to the coveralls.io service.

### 3. npm publish 过程中什么时候用到这个包的呢

第二步就用上了 [实际处理用的包](https://github1s.com/npm/npm-package-arg/blob/main/npa.js)

文章先欠着吧...
