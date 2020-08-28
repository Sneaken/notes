```
总结
this 就是你 call 一个函数时，传入的第一个参数。（请务必背下来「this 就是 call 的第一个参数」）
如果你的函数调用形式不是 call 形式，请按照「转换代码」将其转换为 call 形式。

自执行函数   this    指向  Window
```

首先，必须搞清楚在JS里面，函数的几种调用方式:

- 普通函数调用
- 作为方法来调用
- 作为构造函数来调用
- 使用apply/call方法来调用
- Function.prototype.bind方法
- es6箭头函数

但是不管函数是按哪种方法来调用的，**请记住一点：谁调用这个函数或方法,this关键字就指向谁**。

接下来就分情况来讨论下这些不同的情况：

## 普通函数调用

```
    function person(){
        this.name="xl";
        console.log(this);
        console.log(this.name);
    }
    
    person();  //输出  window  xl   
    
```

在这段代码中`person`函数作为普通函数调用，实际上`person`是作为全局对象`window`的一个方法来进行调用的,即`window.person()`;
所以这个地方是`window`对象调用了`person`方法,那么`person`函数当中的`this`即指`window`,同时`window`还拥有了另外一个属性`name`,值为`xl`.

```
    var name="xl";
    function person(){
        console.log(this.name);
    }
    person(); //输出 xl
```

同样这个地方`person`作为`window`的方法来调用，在代码的一开始定义了一个全局变量`name`，值为`xl`,它相当于`window`的一个属性,即`window.name="xl"`,又因为在调用`person`的时候`this`是指向`window`的，因此这里会输出`xl`.

## 作为方法来调用

在上面的代码中，普通函数的调用即是作为`window`对象的方法进行调用。显然`this`关键字指向了`window`对象.

再来看下其他的形式

```
    var name="XL";
    var person={
        name:"xl",
        showName:function(){
            console.log(this.name);
        }
    }
    person.showName();  //输出  xl
    //这里是person对象调用showName方法，很显然this关键字是指向person对象的，所以会输出name
    
    var showNameA=person.showName;
    showNameA();    //输出  XL
    //这里将person.showName方法赋给showNameA变量，此时showNameA变量相当于window对象的一个属性，因此showNameA()执行的时候相当于window.showNameA(),即window对象调用showNameA这个方法，所以this关键字指向window
```

再换种形式：

```
    var personA={
        name:"xl",
        showName:function(){
            console.log(this.name);
        }
    }
    var personB={
        name:"XL",
        sayName:personA.showName
    }
    
    personB.sayName();  //输出 XL
    //虽然showName方法是在personA这个对象中定义，但是调用的时候却是在personB这个对象中调用，因此this对象指向
```

## 作为构造函数来调用

```
    function  Person(name){
        this.name=name;
    }
    var personA=Person("xl");
    console.log(personA.name); // 输出  undefined
    console.log(window.name);//输出  xl
    //上面代码没有进行new操作，相当于window对象调用Person("xl")方法，那么this指向window对象，并进行赋值操作window.name="xl".
    
    var personB=new Person("xl");
    console.log(personB.name);// 输出 xl
    //这部分代码的解释见下
    
```

### new操作符

```
    //下面这段代码模拟了new操作符(实例化对象)的内部过程
    function person(name){
        var o={};
        o.__proto__=Person.prototype;  //原型继承
        Person.call(o,name);
        return o;
    }
    var personB=person("xl");
    
    console.log(personB.name);  // 输出  xl
    
```

- 在`person`里面首先创建一个空对象o，将o的**proto**指向Person.prototype完成对原型的属性和方法的继承

- `Person.call(o,name)`这里即函数`Person`作为`apply/call`调用(具体内容下方)，将`Person`对象里的`this`改为o，即完成了`o.name=name`操作

- 返回对象o。

  ```
  因此`person("xl")`返回了一个继承了`Person.prototype`对象上的属性和方法，以及拥有`name`属性为"xl"的对象，并将它赋给变量`personB`.
  所以`console.log(personB.name)`会输出"xl"
  ```

## call/apply方法的调用

在JS里函数也是对象，因此函数也有方法。从Function.prototype上继承到`Function.prototype.call/Function.prototype.apply`方法
`call/apply`方法最大的作用就是能改变`this`关键字的指向.

```
Obj.method.apply(AnotherObj,arguments);
    var name="XL";
    var Person={
        name:"xl",
        showName:function(){
            console.log(this.name);
        }
    }
    Person.showName.call(); //输出 "XL"
    //这里call方法里面的第一个参数为空，默认指向window。
    //虽然showName方法定义在Person对象里面，但是使用call方法后，将showName方法里面的this指向了window。因此最后会输出"XL";
    funtion FruitA(n1,n2){
        this.n1=n1;
        this.n2=n2;
        this.change=function(x,y){
            this.n1=x;
            this.n2=y;
        }
    }
    
    var fruitA=new FruitA("cheery","banana");
    var FruitB={
        n1:"apple",
        n2:"orange"
    };
    fruitA.change.call(FruitB,"pear","peach");
    
    console.log(FruitB.n1); //输出 pear
    console.log(FruitB.n2);// 输出 peach
```

`FruitB`调用`fruitA`的`change`方法，将`fruitA`中的`this`绑定到对象`FruitB`上。

## Function.prototype.bind()方法

```
    var name="XL";
    function Person(name){
        this.name=name;
        this.sayName=function(){
            setTimeout(function(){
                console.log("my name is "+this.name);
            },50)
        }
    }
    var person=new Person("xl");
    person.sayName()  //输出  “my name is XL”;
                       //这里的setTimeout()定时函数,相当于window.setTimeout(),由window这个全局对象对调用,因此this的指向为window, 则this.name则为XL 
```

那么如何才能输出`"my name is xl"`呢？

```
    var name="XL";
    function Person(name){
        this.name=name;
        this.sayName=function(){
            setTimeout(function(){
                console.log("my name is "+this.name);
            }.bind(this),50)  //注意这个地方使用的bind()方法，绑定setTimeout里面的匿名函数的this一直指向Person对象
        }
    }
    var person=new Person("xl");
    person.sayName(); //输出 “my name is xl”;
```

这里`setTimeout(function(){console.log(this.name)}.bind(this),50);`,匿名函数使用`bind(this)`方法后创建了新的函数，这个新的函数不管在什么地方执行，`this`都指向的`Person`,而非`window`,因此最后的输出为"my name is xl"而不是"my name is XL"

另外几个需要注意的地方：
`setTimeout/setInterval/匿名函数执行`的时候，`this`默认指向`window对象`，除非手动改变this的指向。在《javascript高级程序设计》当中，写到：“超时调用的代码(`setTimeout`)都是在全局作用域中执行的，因此函数中的this的值，在非严格模式下是指向window对象，在严格模式下是指向undefined”。本文都是在非严格模式下的情况。

```
    var name="XL";
    function Person(){
        this.name="xl";
        this.showName=function(){
            console.log(this.name);
        }
        setTimeout(this.showName,50);
    }
    var person=new Person(); //输出 "XL"
    
    //在setTimeout(this.showName,50)语句中，会延时执行this.showName方法
    //this.showName方法即构造函数Person()里面定义的方法。50ms后，执行this.showName方法，this.showName里面的this此时便指向了window对象。则会输出"XL";
```

修改上面的代码：

```
    var name="XL";
    function Person(){
        this.name="xl";
        var that=this;
        this.showName=function(){
            console.log(that.name);
        }
        setTimeout(this.showName,50)
    }
    var person=new Person(); //输出 "xl"
    //这里在Person函数当中将this赋值给that，即让that保存Person对象，因此在setTimeout(this.showName,50)执行过程当中，console.log(that.name)即会输出Person对象的属性"xl"
```

匿名函数：

```
    var name="XL";
    var person={
        name:"xl",
        showName:function(){
            console.log(this.name);
        }
        sayName:function(){
            (function(callback){
                callback();
            })(this.showName)
        }
    }
    person.sayName();  //输出 XL
    var name="XL";
    var person={
        name:"xl",
        showName:function(){
            console.log(this.name);
        }
        sayName:function(){
            var that=this;
            (function(callback){
                callback();
            })(that.showName)
        }
    }
    person.sayName() ;  //输出  "xl"
    //匿名函数的执行同样在默认情况下this是指向window的，除非手动改变this的绑定对象
```

## Eval函数

该函数执行的时候，this绑定到当前作用域的对象上

```
    var name="XL";
    var person={
        name:"xl",
        showName:function(){
            eval("console.log(this.name)");
        }
    }
    
    person.showName();  //输出  "xl"
    
    var a=person.showName;
    a();  //输出  "XL"
```

## 箭头函数  

箭头函数中this倒底指向谁？一句话，箭头函数内的this就是箭头函数外的那个this！ 为什么？因为箭头函数没有自己的this。
`es6`里面`this`指向固定化，始终指向外部对象，因为箭头函数没有`this`,因此它自身不能进行`new`实例化,同时也不能使用`call, apply, bind`等方法来改变`this`的指向

```
   function Timer() {
        this.seconds = 0;
        setInterval( () => this.seconds ++, 1000);
    } 
    
    var timer = new Timer();
    
    setTimeout( () => console.log(timer.seconds), 3100);
    
    // 3
    
    在构造函数内部的setInterval()内的回调函数，this始终指向实例化的对象，并获取实例化对象的seconds的属性,每1s这个属性的值都会增加1。否则最后在3s后执行setTimeOut()函数执行后输出的是0
```
ES6中的箭头函数是根据外层的作用域来决定this，即取决于**外层的函数作用域或全局作用域**，而且箭头函数的绑定无法修改，即使是new绑定也不可以。
```
function foo() {
    return (a) => {
        console.log( this.a );
    }
}
var obj1 = {
    a: 2
};
var obj2 = {
    a: 3
};
var bar = foo.apply(obj1);
bar.apply(obj2);    //2
```
### 换个角度理解

如果像作者一样，大家也觉得上述四种方式不方便记忆，过一段时间后，又搞不明白 this 究竟指什么。那么我向大家推荐 Yehuda Katz 的这篇文章：[Understanding JavaScript Function Invocation and “this”](http://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this) 。在这篇文章里，Yehuda Katz 将 apply 或 call 方式作为函数调用的基本方式，其他几种方式都是在这一基础上的演变，或称之为语法糖。Yehuda Katz 强调了函数调用时 this 绑定的过程，不管函数以何种方式调用，均需完成这一绑定过程，不同的是，作为函数调用时，this 绑定到全局对象；作为方法调用时，this 绑定到该方法所属的对象。
