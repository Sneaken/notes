/* 栈 先进先出 */
/* 方法一、方法二 不安全 因为list不是私有属性 */
/* 方式一 数组实现 大部分方法的时间复杂度是 O(n) */
class Stack {
  constructor() {
    this.list = [];
  }
  /* 向栈顶添加元素 */
  push(item) {
    this.list.push(item);
  }
  /* 弹出并返回栈顶 */
  pop() {
    return this.list.pop();
  }
  /* 返回栈顶元素 */
  peek() {
    return this.list[this.list.length - 1];
  }
  /* 是否是空栈 */
  isEmpty() {
    return this.list.length === 0;
  }
  /* 清空栈 */
  clear() {
    this.list = [];
  }
  /* 返回栈大小 */
  size() {
    return this.list.length;
  }
  toString() {
    return this.list.toString();
  }
}

/* 方法二 对象实现 */
/* 除了 toString 方法，我们创建的其他方法的复杂度均为 O(1)，代表我们可以
直接找到目标元素并对其进行操作（ push、 pop 或 peek）。 */
class Stack2 {
  constructor() {
    this.list = {};
    this.count = 0;
  }
  /* 向栈顶添加元素 */
  push(item) {
    this.list[this.count++] = item;
  }
  /* 弹出并返回栈顶元素 */
  pop() {
    if (this.isEmpty()) return undefined;
    const item = this.list[this.count - 1];
    delete this.list[--this.count];
    return item;
  }
  /* 返回栈顶元素 */
  peek() {
    if (this.isEmpty()) return undefined;
    return this.list[this.count - 1];
  }
  /* 返回栈大小 */
  size() {
    return this.count;
  }
  /* 是否空栈 */
  isEmpty() {
    return this.count === 0;
  }
  /* 清空栈 */
  clear() {
    this.list = {};
    this.count = 0;
  }
  toString() {
    if (this.isEmpty()) return "";
    let result = `${this.list[0]}`;
    for (let index = 1; index < this.count; index++) {
      result = `${result},${this.list[index]}`;
    }
    return result; // 书上方法
    // return Object.keys(this.list)
    //   .map(key => this.list[key])
    //   .toString(); // 自己想的
  }
}

// WeakMap 可以确保属性是私有的
const items = new WeakMap();
class Stack3 {
  constructor() {
    items.set(this, []);
  }
  /* 向栈顶添加元素 */
  push(item) {
    const list = items.get(this);
    list.push(item);
  }
  /* 弹出并返回栈顶元素 */
  pop() {
    if (this.isEmpty()) return undefined;
    const list = items.get(this);
    return list.pop();  
  }
  /* 返回栈顶元素 */
  peek() {
    if (this.isEmpty()) return undefined;
    const list = items.get(this);
    return list[list.length - 1];
  }
  /* 返回栈大小 */
  size() {
    return items.get(this).length;
  }
  /* 是否空栈 */
  isEmpty() {
    return items.get(this).length === 0;
  }
  /* 清空栈 */
  clear() {
    items.set(this, []);
  }
  toString() {}
}
