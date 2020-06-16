# 几种绑定规则

- 默认绑定
- 隐式绑定
- 显示绑定
- new 绑定

## 默认绑定

在不能使用其他绑定规则时，应用默认绑定

- 在非严格模式下，指向全局对象
- 在严格模式下，指向 undefined

## 隐式绑定

理解为 father.child.call(father.child,...args)

绑定的是最近一层的对象

### 隐式绑定丢失

发生在事件回调 具体问题具体分析

```js
function sayHi() {
  console.log("Hello,", this.name);
}
const person1 = {
  name: "张三",
  sayHi: function() {
    setTimeout(function() {
      console.log("Hello,", this.name);
    });
  }
};
const person2 = {
  name: "李四",
  sayHi: sayHi
};
var name = "王五";
person1.sayHi();
setTimeout(person2.sayHi, 100);
setTimeout(function() {
  person2.sayHi();
}, 200);
```

## 显示绑定

### 题外话

> call apply 绑定并执行

> bind 返回一个新函数

### demo

```js
function sayHi() {
  console.log("Hello,", this.name);
}
const person = {
  name: "YvetteLau",
  sayHi: sayHi
};
var name = "Wiliam";
const Hi = function(fn) {
  fn(); // 存在 绑定丢失
  // fn.call(this); // 这样 fn 函数的绑定就不会丢失
};
Hi.call(person, person.sayHi);
```

## new 绑定

用 new 来调用函数的时候，就会新对象绑定到这个函数的 this 上。

## 绑定优先级

new 绑定 > 显式绑定 > 隐式绑定 > 默认绑定

## 箭头函数

箭头函数没有自己的 this，它的 this 继承于外层代码库中的 this。

## 练习题

```js
function Foo() {
  getName = function() {
    alert(1);
  };
  return this;
}
Foo.getName = function() {
  alert(2);
};
Foo.prototype.getName = function() {
  alert(3);
};
var getName = function() {
  alert(4);
};
function getName() {
  alert(5);
}

//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

```js
var name = "window";

var person1 = {
  name: "person1",
  show1: function() {
    console.log(this.name);
  },
  show2: () => console.log(this.name),
  show3: function() {
    return function() {
      console.log(this.name);
    };
  },
  show4: function() {
    return () => console.log(this.name);
  }
};
var person2 = { name: "person2" };

person1.show1();
person1.show1.call(person2);

person1.show2();
person1.show2.call(person2);

person1.show3()();
person1.show3().call(person2);
person1.show3.call(person2)();

person1.show4()();
person1.show4().call(person2);
person1.show4.call(person2)();
```

```js
var name = "window";

function Person(name) {
  this.name = name;
  this.show1 = function() {
    console.log(this.name);
  };
  this.show2 = () => console.log(this.name);
  this.show3 = function() {
    return function() {
      console.log(this.name);
    };
  };
  this.show4 = function() {
    return () => console.log(this.name);
  };
}

var personA = new Person("personA");
var personB = new Person("personB");

personA.show1();
personA.show1.call(personB);

personA.show2();
personA.show2.call(personB);

personA.show3()();
personA.show3().call(personB);
personA.show3.call(personB)();

personA.show4()();
personA.show4().call(personB);
personA.show4.call(personB)();
```
