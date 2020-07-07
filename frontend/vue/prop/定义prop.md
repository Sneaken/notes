# prop 验证

```js
Vue.component("my-component", {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object, // 对象类型只是 Object
      // 对象或数组默认值必须从一个工厂函数获取
      default() {
        return { message: "hello" };
      }
    },
    // 自定义验证函数
    propF: {
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["success", "warning", "danger"].indexOf(value) !== -1;
      }
    }
  }
});
```

## 类型检查

type 可以是下列原生构造函数中的一个：

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

额外的，type 还可以是一个自定义的构造函数，并且通过 instanceof 来进行检查确认。例如，给定下列现成的构造函数：

```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
// 你可以使用：
Vue.component("blog-post", {
  props: {
    author: Person
  }
});
// 来验证 author prop 的值是否是通过 new Person 创建的。
```

## 修改 props

> 不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告（对于引用类型，只要引用没变就不会发出警告，所以需要注意！！）。

> Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value.

### 这里有两种常见的试图变更一个 prop 的情形：

1. 这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。在这种情况下，最好定义一个本地的 data property 并将这个 prop 用作其初始值：
   ```
   props: ['initialCounter'],
   data() {
     return {
       counter: this.initialCounter
     }
   }
   ```
2. 这个 prop 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：
   ```
   props: ['size'],
   computed: {
     normalizedSize: function () {
       return this.size.trim().toLowerCase() 
     } 
   }
   ```
   
   
注意：以上两个 demo（官网的）其实都是基本类型的 prop。

注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身将会影响到父组件的状态。

如果父组件的相关属性加 sync 那么\$emit('update:xxx',xxx)也是能修改到父组件
但是如果 props 是引用类型，在不用深拷贝的情况下，无需以上步骤就能修改父组件数据，因为引用都是一样的。

这就要求注意修改 prop 的相关事项!

而深拷贝 prop 只有在\$emit 的时候才能修改父组件数据，此时因为父级组件发生了变更，子组件中所有的 prop 都将会刷新为最新的值，所以子组件的 dom 被刷新了。

如果你即用了深拷贝的 prop，又没用\$emit 修改父组件的数据，但你还想修改这个 prop，并且还想修改后刷新 dom 上引用这个 prop 的地方，那么这个深拷贝的 prop 对象得是响应式的。即 Vue.observable(深拷贝的 prop 对象)。 emmm...看到这你就知道了 这个深拷贝对象用 data 定义就可以了，不要用 computed 定义。

上面的废话可以转换成下面4个例子

1.data定义 浅拷贝prop
```vue
<template>
  <h2>objItem {{ internalObjItem }}</h2>
  <button @click="handleChange">change age</button>
</template>

<script>
export default {
  props: {
    objItem: {
      type: Object
    }
  },
  data() {
    return {
      internalObjItem: this.objItem
    };
  },
  methods: {
    handleChange() {
      this.internalObjItem.age++; // 用data定义数据是响应式的，dom会同步修改，同时因为不是深拷贝，父组件也会被影响。
    }
  }
};
</script>
```

2.data定义 深拷贝prop
```vue
<template>
  <h2>objItem {{ internalObjItem }}</h2>
  <button @click="handleChange">change age</button>
</template>

<script>
export default {
  props: {
    objItem: {
      type: Object
    }
  },
  data() {
    return {
      internalObjItem: JSON.parse(JSON.stringify(this.objItem))
    };
  },
  methods: {
    handleChange() {
      this.internalObjItem.age++; // 用data定义数据是响应式的，dom会同步修改，因为是深拷贝，没emit不会影响到父组件。
      // this.$emit('update:objItem', this.internalObjItem); // 显式提交以修改父组件数据
    }
  }
};
</script>
```

3.computed定义 浅拷贝prop
```vue
<template>
  <h2>objItem {{ internalObjItem }}</h2>
  <button @click="handleChange">change age</button>
</template>

<script>
export default {
  props: {
    objItem: {
      type: Object
    }
  },
  computed: {
    internalObjItem: {
      get() {
        return this.objItem;
      },
      set(val) {
       // 修改属性是不会触发set的，只有重新赋值才会触发set，例如 this.internalObjItem = 2 // 这是题外话 = =。
      }
    }
  },
  methods: {
    handleChange() {
      this.internalObjItem.age++; // 用computed定义，数据不是响应式的，但是本例中父组件传进来的值一般是响应式的，dom会同步修改，并且因为是浅拷贝，影响到父组件。
    }
  }
};
</script>
```
4.computed定义 深拷贝prop
```vue
<template>
  <h2>objItem {{ internalObjItem }}</h2>
  <button @click="handleChange">change age</button>
</template>

<script>
export default {
  props: {
    objItem: {
      type: Object
    }
  },
  computed: {
    internalObjItem: {
      get() {
        return JSON.parse(JSON.stringify(this.objItem));
      }
    }
  },
  methods: {
    handleChange() {
      this.internalObjItem.age++; // 用computed定义，数据不是响应式的(你可以用Vue.observable将数据变成响应式，dom就会同步修改，因为深拷贝拷贝，不影响父组件)，dom不会同步修改，因为是深拷贝，没emit不会影响到父组件。
      // this.$emit('update:objItem', this.internalObjItem); // 显式提交以修改父组件数据
    }
  }
};
</script>
```

