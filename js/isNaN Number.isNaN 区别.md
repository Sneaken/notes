window上有一个全局方法isNaN()，可能大分部人习惯理解此方法为判断一个值是等于NaN，这是因为is NaN直译就是“是不是NaN”所带来的误解，其实本意不是这样：

```
isNaN(123) //false
isNaN('123时间跳跃') //true
isNaN(NaN) //true
```

当我们向isNaN传递一个参数，它的本意是通过Number()方法尝试转换参数的类型为Number，如果转换成功返回false，否则转返回true，**它只是判断这个参数能否转成数字而已，并不是判断是否严格等于NaN**。

所以当你要判断**某个值是否严格等于NaN时**无法使用isNaN()方法，毕竟你传递任意字符串它都会返回true。

ES6中提供了一个Number.isNaN()方法用于判断一个值是否严格等于NaN：

```
Number.isNaN(NaN)//true
```

与isNaN最大的区别是，Number.isNaN不存在转换类型的行为，这点是最大的不同：

```
isNaN(NaN) //true
Number.isNaN(NaN) //true

isNaN('听风是风') //true
Number.isNaN('听风是风') //false
```

我们在前面说过，NaN是唯一一个与自身不相等的特殊值，如果你觉得Number.isNaN存在兼容问题，也可以利用这个特点自己定义验证方法：

```
const ISNAN = (value) => value !== value;
ISNAN('听风是风'); //false
ISNAN(123); //false
ISNAN(NaN); //true
```