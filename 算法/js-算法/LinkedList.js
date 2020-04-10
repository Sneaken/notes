/**
 * 链表辅助类 结点
 */
class Node {
  constructor(element, next = null) {
    this.element = element; // 结点值
    this.next = next; // 指向下一个结点
  }
}

/**
 * 链表
 */
class LinkedList {
  constructor(equalsFn = (a, b) => a === b) {
    this.count = 0; // 大小
    this.head = null; // 头指针
    this.equalsFn = equalsFn;
  }

  /**
   * 返回头结点
   * @returns {null|Node<T>}
   */
  getHead() {
    return this.head;
  }
  /**
   * 添加元素
   * @param element
   */
  push(element) {
    if (this.isEmpty()) {
      this.head = new Node(element);
    } else {
      const node = new Node(element);
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }

  /**
   * 插入元素
   * @param element
   * @param {number} index 下标
   */
  insert(element, index) {
    if (index < 0) index = 0;
    if (index >= this.size()) {
      this.push(element);
    } else {
      const target = new Node(element);
      if (index === 0) {
        target.next = this.head;
        this.head = target;
      } else {
        const previous = this.getElementAt(index - 1);
        const current = previous.next;
        previous.next = target;
        target.next = current;
      }
      this.count++;
    }
  }

  /**
   * 获取index位置的元素
   * @param {number} index 下标
   */
  getElementAt(index) {
    if (index < 0 || index >= this.size()) return null;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  /**
   * 移除element元素
   * @param element
   */
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  /**
   * 移除index位置上的元素，并返回它
   * @param {number} index
   * @returns {number|null}
   */
  removeAt(index) {
    if (index < 0 || index >= this.size()) return null;
    let current;
    if (index === 0) {
      current = this.head;
      this.head = current.next;
    } else {
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      previous.next = current.next;
    }
    this.count--;
    return current;
  }

  /**
   * 获取元素位置
   * @param element
   * @returns {number}
   */
  indexOf(element) {
    let current = this.head;
    for (let index = 0; index < this.count && current.next != null; index++) {
      if (this.equalsFn(current.element, element)) {
        return index; // 退出函数
      }
      current = current.next;
    }
    return -1;
  }

  /**
   * 是否空链表
   * @returns {boolean}
   */
  isEmpty() {
    return this.count === 0;
  }

  /**
   * 返回链表大小
   * @returns {number}
   */
  size() {
    return this.count;
  }
  toString() {
    if (this.isEmpty()) return "";
    let current = this.head;
    const result = [];
    for (let i = 0; i < this.count; i++) {
      result.push(current.element);
      current = current.next;
    }
    return result.toString();
  }
}

// const list = new LinkedList();
// list.push(1);
// list.push(2);
// list.push(3);
// console.log("list.toString() =>", list.toString());
// // console.log("list.getElementAt(0) =>", list.getElementAt(0));
// // console.log("list.removeAt(0) =>", list.removeAt(0));
// // console.log("list =>", list);
// // console.log("list.getElementAt(1) =>", list.getElementAt(1));
// // console.log("list.getElementAt(2) =>", list.getElementAt(2));
// // console.log("list.getElementAt(3) =>", list.getElementAt(3));
// console.log("list.indexOf(1) =>", list.indexOf(1));
// console.log("list.indexOf(2) =>", list.indexOf(2));
// console.log("list.indexOf(3) =>", list.indexOf(3));
// console.log("list.indexOf(4) =>", list.indexOf(4));
// console.log("list.insert(4, 3) =>", list.insert(4, 3));
// console.log("list.toString() =>", list.toString());
// list.insert(5, 3);
// console.log("list.toString() =>", list.toString());
// list.insert(7, -1);
// console.log("list.toString() =>", list.toString());

module.exports = {
  Node,
  LinkedList
};
