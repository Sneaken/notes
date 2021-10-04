# mitt

## 1. 介绍

Tiny 200b functional event emitter / pubsub.

一个小而精的库，可以先构思一下怎么实现这个库的功能，再看源码，看看和源码实现的有何差异

## 2. 源码

> 如果不懂 ts， 可以在命令行执行 tsc ./src/index.ts, 这样 ts 就被编译为 js 啦。
> 不过在下认为这边文章的重点还是 ts 的类型声明，因为就实现来说并不难，但是写好这个类型说明可能就需要点水平了

```typescript
// 事件类型可以是 字符串 或者是 symbol
export type EventType = string | symbol;

// An event handler can take an optional event argument and should not return a value
// 很保守, 泛型没指定的话,默认为: 顶级类型 unknown, (这是为了避免开发时类型推导的性能损耗么？)，尽量避免使用 any, unknown 可以认为是安全版本的any
export type Handler<T = unknown> = (event: T) => void;
// Record 工具函数(见总结3.4)
// keyof (见总结3.1)
// T[keyof T] 实际上是联合类型（见总结3.2）
export type WildcardHandler<T = Record<string, unknown>> = (type: keyof T, event: T[keyof T]) => void;

// An array of all currently registered event handlers for a type
export type EventHandlerList<T = unknown> = Array<Handler<T>>;
export type WildCardEventHandlerList<T = Record<string, unknown>> = Array<WildcardHandler<T>>;

// A map of event types and their corresponding event handlers.
// 这里的 Map 指的实际上是 ES6 的 Map， new Map 的这个 Map, 项目里可以用`Command + 鼠标左键`点击Map 查看具体内容
export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
  keyof Events | '*',
  EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>;

export interface Emitter<Events extends Record<EventType, unknown>> {
  all: EventHandlerMap<Events>;

  // 重载（需要重载的原因: 根据 type 是否为'*', handler的参数会发生变化）
  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
  on(type: '*', handler: WildcardHandler<Events>): void;

  // 重载
  off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void;
  off(type: '*', handler: WildcardHandler<Events>): void;

  // 重载
  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
  // 意思是 如果 type 真是 undefined 就把 undefined 当做 key, 否则类型则为 never 代表永不存在的值的类型
  // 所以 emit() 理论上是不能简单地理解成 emit('*') 的简写
  emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void;
}

/**
 * Mitt: Tiny (~200b) functional event emitter / pubsub.
 * @name mitt
 * @returns {Mitt}
 */
// Events 到底指的是哪一个？
// 其实指的是 T 这个位置的 function mitt<T>() {}
export default function mitt<Events extends Record<EventType, unknown>>(
  all?: EventHandlerMap<Events>,
): Emitter<Events> {
  type GenericEventHandler =
    // Events[keyof Events] 实际上是个联合类型
    // 具体见总结3.1
    // 这边是只有一个参数的事件处理函数
    // (event) => {}
    | Handler<Events[keyof Events]>
    // 这边是两个参数的事件处理函数
    // (type, event) => {}
    | WildcardHandler<Events>;

  // 给 all 设置个默认值， 总体来说 all 必须是 Map 类型的
  all = all || new Map();

  return {
    /**
     * A Map of event names to registered handler functions.
     */
    all,

    /**
     * Register an event handler for the given type.
     * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
     * @param {Function} handler Function to call in response to given event
     * @memberOf mitt
     */
    on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
      // ! 强制断言，表示一定存在
      const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
      if (handlers) {
        // 之前设置过就直接 push 进去
        handlers.push(handler);
      } else {
        // 没设置过就设置下
        // 注意：新设置时应该是数组
        // 为什么使用类型断言？
        // 因为要和 all 的类型保持一致
        // 为了和 all 的 类型保持一致为什么不是 EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events> ?
        // 因为这边是指定了类型的。
        // WildCardEventHandlerList<Events> 是给 type 为 '*' 时用的
        all!.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
      }
    },
    /**
     * Remove an event handler for the given type.
     * If `handler` is omitted, all handlers of the given type are removed.
     * @param {string|symbol} type Type of event to unregister `handler` from, or `'*'`
     * @param {Function} [handler] Handler function to remove
     * @memberOf mitt
     */
    off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
      const handlers: Array<GenericEventHandler> | undefined = all!.get(type);

      // 容错处理
      if (handlers) {
        // 存在 handler 则从数组中删除
        if (handler) {
          // >>> 无符号右移 见 总结4
          // 写法很骚，'-1' >>> 0  => 4294967295
          // 存在必然能删， 不存在也删不着，很优雅
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);

          // 不存在则重置 handlers (删除全部 handlers)
        } else {
          all!.set(type, []);
        }
      }
    },

    /**
     * Invoke all handlers for the given type.
     * If present, `'*'` handlers are invoked after type-matched handlers.
     *
     * Note: Manually firing '*' handlers is not supported.
     *
     * @param {string|symbol} type The event type to invoke
     * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
     * @memberOf mitt
     */
    emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
      let handlers = all!.get(type);
      if (handlers) {
        // 这里必须类型断言，因为这边是只传一个参数的
        // .slice 的作用，防止 handler 能修改 handlers (这个细节可能是常识了，需要注意)
        (handlers as EventHandlerList<Events[keyof Events]>).slice().map((handler) => {
          // ! 强制断言，表示一定存在
          handler(evt!);
        });
      }

      // 这里还是比较专业的，如果要我实现这个库的功能的话，我可能会忽略这个功能
      // 这样写的话还能省一个变量名
      handlers = all!.get('*');
      if (handlers) {
        // 这里必须类型断言，因为这边是要传两个参数
        (handlers as WildCardEventHandlerList<Events>).slice().map((handler) => {
          // type 实际上指的是执行的 type
          // ! 强制断言，表示一定存在
          handler(type, evt!);
        });
      }
    },
  };
}
```

## 3. 总结

### 3.1 [keyof](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)

```typescript
type Point = { x: number; y: string };
type P = keyof Point;
type UnionType = Point[P]; // number | string
```

### 3.2 [union type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

```typescript
type UnionType = string[] | number[];
const list1: UnionType = [1, 2, 3]; // OK
const list2: UnionType = ['1', '2', '3']; // OK
const list3: UnionType = ['1', 2, 3]; // ERROR
// TS2322: Type '(string | number)[]' is not assignable to type 'UnionType'.
//   Type '(string | number)[]' is not assignable to type 'string[]'.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
type UnionType2 = (string | number)[];
const list4: UnionType2 = ['1', 2, 3]; // OK
```

### 3.3 [generics](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-types)

```typescript
class Person<T, K> {
  private name: T;
  private age: K;
  constructor(name: T, age: K) {
    this.name = name;
    this.age = age;
  }
}

const person1 = new Person<string, string>('person1', 4); // ERROR
const person2 = new Person<string, number>('person1', 4); // OK
```

### 3.4 [utility-types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

> 工具类型， 深入 ts 必备

### 3.5 indexOf

#### 3.5.1 [String.prototype.indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf#%E8%BF%94%E5%9B%9E%E5%80%BC)

> 会有诡异的结果

##### 3.5.1.1 语法

> str.indexOf(searchValue [, fromIndex])

###### 3.5.1.1.1 参数

searchValue

如果没有提供确切地提供字符串，searchValue 会被强制设置为 "undefined"， 然后在当前字符串中查找这个值。

举个例子：'undefined'.indexOf() 将会返回 0，因为 undefined 在位置 0 处被找到，但是 'undefine'.indexOf() 将会返回 -1 ，因为字符串 'undefined' 未被找到。

fromIndex 可选

数字表示开始查找的位置。可以是任意整数，默认值为 0。

如果 fromIndex 的值小于 0，或者大于 str.length ，那么查找分别从 0 和 str.length 开始。（译者注： fromIndex 的值小于 0，等同于为空情况； fromIndex 的值大于或等于 str.length ，那么结果会直接返回 -1 。）

举个例子，'hello world'.indexOf('o', -5) 返回 4 ，因为它是从位置 0 处开始查找，然后 o 在位置 4 处被找到。另一方面，'hello world'.indexOf('o', 11) （或 fromIndex 填入任何大于 11 的值）将会返回 -1 ，因为开始查找的位置 11 处，已经是这个字符串的结尾了。

##### 3.5.1.2 返回值

查找的字符串 searchValue 的第一次出现的索引，如果没有找到，则返回 -1。

若被查找的字符串 searchValue 是一个空字符串，将会产生`“奇怪”`的结果。

如果 fromIndex 值为空，或者 fromIndex 值小于被查找的字符串的长度，返回值和以下的 fromIndex 值一样：

```js
'hello world'.indexOf(''); // 返回 0
'hello world'.indexOf('', 0); // 返回 0
'hello world'.indexOf('', 3); // 返回 3
'hello world'.indexOf('', 8); // 返回 8
```

另外，如果 fromIndex 值大于等于字符串的长度，将会直接返回字符串的长度（str.length）：

```js
'hello world'.indexOf('', 11); // 返回 11
'hello world'.indexOf('', 13); // 返回 11
'hello world'.indexOf('', 22); // 返回 11
```

从前面一个例子可以看出，被查找的值是空值时，Javascript 将直接返回指定的索引值。从后面一个例子可以看出，被查找的值是空值时，Javascript 将直接返回字符串的长度。

#### 3.5.2 [Array.prototype.indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#%E8%BF%94%E5%9B%9E%E5%80%BC)

> 不会有诡异的结果

##### 3.5.2.1 语法

> arr.indexOf(searchElement[, fromIndex])

###### 3.5.2.1.1 参数

searchElement

要查找的元素

fromIndex 可选

开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。

如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1 表示从最后一个元素开始查找，-2 表示从倒数第二个元素开始查找 ，以此类推。

注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。如果抵消后的索引值仍小于 0，则整个数组都将会被查询。其默认值为 0.

##### 3.5.2.2 返回值

首个被找到的元素在数组中的索引位置; 若没有找到则返回 -1

### 3.6 >>> (无符号右移)

[参考文章](https://segmentfault.com/a/1190000014613703)

### 3.7 [4294967295 是什么意思](https://blog.csdn.net/zhanghuaishu0/article/details/79718397)

### 3.8 [symbol](https://es6.ruanyifeng.com/#docs/symbol)

> 独一无二的值

### 3.9 given type 译为 给定类型

所以别把 `指定类型` 翻译成 `specified type` 不专业。

## 4. 推荐阅读

1. [官方文档](https://www.typescriptlang.org/docs/)
2. [深入理解 Typescript](https://jkchao.github.io/typescript-book-chinese/#why)
3. [jsdoc](https://jsdoc.app/)
