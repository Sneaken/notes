const { Node, LinkedList } = require("./LinkedList");

/**
 * 双向链表辅助类
 */
class DoublyNode extends Node {
  constructor(element, next = null, prev = null) {
    super(element, next);
    this.prev = prev;
  }
}
/**
 * 双向链表
 */
class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = (a, b) => a === b) {
    super(equalsFn);
    this.tail = null;
  }
  push(element) {
    const target = new DoublyNode(element);
    if (this.isEmpty()) {
      this.head = target;
      this.tail = target;
    } else {
      this.tail.next = target;
      target.prev = this.tail;
      this.tail = target;
    }
    this.count++;
  }
  /**
   * insert everywhere
   * @param element
   * @param {number} index
   */
  insert(element, index) {
    // index < 0
    if (index < 0) index = 0;
    // index >= length of list
    if (index >= this.size()) {
      this.push(element);
    } else {
      const target = new DoublyNode(element);
      // insert to the start
      if (index === 0) {
        // [head]
        // [target head]
        this.head.prev = target;
        target.next = this.head;
        this.head = target;
        // insert to before the last
      } else if (index === this.size() - 1) {
        // [ prev tail]
        // [ prev target tail]
        const prev = this.tail.prev;
        target.next = this.tail;
        target.prev = prev;
        prev.next = target;
        this.tail.prev = target;
      } else {
        // [ prev index]
        // [ prev target index]
        const previous = this.getElementAt(index - 1);
        const current = previous.next;
        target.next = current;
        target.prev = previous;
        previous.next = target;
        current.prev = target;
      }
      this.count++;
    }
  }

  /**
   * remove everywhere
   * @param {number} index
   * @returns {null|*}
   */
  removeAt(index) {
    if (this.isEmpty()) return null;
    if (index >= this.size()) return null;
    let current = this.head;
    if (index === 0) {
      const next = current.next;
      next.prev = null;
      this.head = next;
    } else {
      // [prev current next]
      // [prev next]
      current = this.getElementAt(index);
      const prev = current.prev;
      prev.next = current.next;
      next.prev = prev;
    }
    this.count--;
    return current.element;
  }
}

const list = new DoublyLinkedList();
list.push(1);
list.push(2);
list.push(3);
list.insert(4, 4);
console.log("list.toString() =>", list.toString());
console.log("list =>", list);
