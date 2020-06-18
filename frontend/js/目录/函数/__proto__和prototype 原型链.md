我们需要牢记两点：

1. \_\_proto\_\_和 constructor 属性是对象所独有的；
2. prototype 属性是函数所独有的，因为函数也是一种对象，所以函数也拥有\_\_proto\_\_和 constructor 属性。
3. \_\_proto\_\_属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的\__proto_\_属性所指向的那个对象（父对象）里找，一直找，直到\_\_proto\_\_属性的终点 null，然后返回 undefined，通过\_\_proto\_\_属性将对象连接起来的这条链路即我们所谓的原型链。
4. prototype 属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即 f1.\_\_proto\_\_ === Foo.prototype。
5. constructor 属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向 Function。即 Foo.prototype.constructor === Foo
