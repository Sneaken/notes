```js
 const routes = [
    { path: '/' },
    // params are denoted with a colon ":" params参数
    { path: '/params/:foo/:bar' },
    // a param can be made optional by adding "?" 可选参数
    { path: '/optional-params/:foo?' },
    // a param can be followed by a regex pattern in parens 参数后可跟正则
    // this route will only be matched if :id is all numbers 参数检验
    { path: '/params-with-regex/:id(\\d+)' },
    // asterisk can match anything 匹配所有
    { path: '/asterisk/*' },
    // make part of the path optional by wrapping with parens and add "?" 可选路径
    { path: '/optional-group/(foo/)?bar' }
  ]
```

vue router 在下认为都适用

[文档链接](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0#parameters)
