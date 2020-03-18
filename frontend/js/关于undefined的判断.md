```
a === undefined
Uncaught ReferenceError: a is not defined
a === undefined
Uncaught ReferenceError: a is not defined
typeof(a) === 'undefined'
// true
// 以上情况 a 都没定义

let a;
a == undefined
// true
a === undefined
// true
typeof(a) === 'string'
// true
a = null;
a == undefined
// true
a === undefined
// false

结论
    undefined == null
    null == undefined
    判断undefined 用typeof() 能避免抛出异常
```

