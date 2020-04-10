/**
 * 双端队列
 */
class Deque {
  constructor() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  /**
   * 前端添加元素
   * @param element
   */
  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else {
      this.items[--this.lowestCount] = element;
    }
  }

  /**
   * 后端添加元素
   * @param element
   */
  addBack(element) {
    this.items[this.count++] = element;
  }

  /**
   * 从前端删除元素
   */
  removeFront() {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.lowestCount];
    delete this.items[this.lowestCount++];
    return item;
  }

  /**
   * 从后端删除元素
   */
  removeBack() {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.count];
    delete this.items[this.count--];
    return item;
  }

  /**
   * 从前端返回第一个元素
   */
  peekFront() {
    return this.items[this.lowestCount];
  }

  /**
   * 从后端返回第一个元素
   */
  peekBack() {
    return this.items[this.count];
  }
  /* 是否是空队列 */
  isEmpty() {
    return this.size() === 0;
  }
  /* 当前队列大小 */
  size() {
    return this.count - this.lowestCount;
  }
  /* 清空队列 */
  clean() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }
  toString() {
    // 不适用于元素是对象时 [object Object]
    if (this.isEmpty()) return "";
    let result = this.items[this.lowestCount];
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      result = `${result},${this.items[i]}`;
    }
    return result;
  }
}

const deque = new Deque();
console.log("deque.isEmpty() =>", deque.isEmpty()); // 输出 true
deque.addBack("John");
deque.addBack("Jack");
console.log("deque.toString() =>", deque.toString()); // John, Jack
deque.addBack("Camila");
console.log("deque.toString() =>", deque.toString()); // John, Jack, Camila
console.log("deque.size() =>", deque.size()); // 输出 3
console.log("deque.isEmpty() =>", deque.isEmpty()); // 输出 false
deque.removeFront(); // 移除 John
console.log("deque.toString() =>", deque.toString()); // Jack, Camila
deque.removeBack(); // Camila 决定离开
console.log("deque.toString() =>", deque.toString()); // Jack
deque.addFront("John"); // John 回来询问一些信息
console.log("deque.toString() =>", deque.toString()); // John, Jack

/**
 * 回文检查器
 * @param aString
 */
function palindromeChecker(aString) {
  if (
    aString === undefined ||
    aString === null ||
    (aString !== 0 && aString.length === 0)
  )
    return false;
  const deque = new Deque(); // {2}
  const lowerString = aString
    .toLocaleLowerCase()
    .split(" ")
    .join(""); // {3}
  let isEqual = true;
  let firstChar, lastChar;
  for (let i = 0; i < lowerString.length; i++) {
    // {4}
    deque.addBack(lowerString.charAt(i));
  }
  while (deque.size() > 1 && isEqual) {
    // {5}
    firstChar = deque.removeFront(); // {6}
    lastChar = deque.removeBack(); // {7}
    if (firstChar !== lastChar) {
      isEqual = false; // {8}
    }
  }
  return isEqual;
  // 以下是自己想的
  // const deque = new Deque();
  // const len = aString.length;
  // if (len % 2 === 0) {
  //   // 偶数
  //   for (let i = 0; i < len / 2; i++) {
  //     deque.addFront(aString[i]);
  //   }
  //   return (
  //     deque
  //       .toString()
  //       .split(",")
  //       .join("") === aString.substring(len / 2)
  //   );
  // } else {
  //   // 奇数
  //   for (let i = 0; i < (len - (len % 2)) / 2; i++) {
  //     deque.addFront(aString[i]);
  //   }
  //   return (
  //     deque
  //       .toString()
  //       .split(",")
  //       .join("") === aString.substring((len - (len % 2)) / 2 + 1)
  //   );
  // }
}
console.log("palindromeChecker('12344321') =>", palindromeChecker("12344321"));
console.log("palindromeChecker('12321') =>", palindromeChecker("12321"));
console.log("palindromeChecker('madam') =>", palindromeChecker("madam"));
console.log("palindromeChecker('racecar') =>", palindromeChecker("racecar"));
