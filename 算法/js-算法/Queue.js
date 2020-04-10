/**
 * 队列 先进先出
 */
class Queue {
  constructor() {
    this.queue = {};
    this.count = 0; // 控制队列的大小
    this.lowestCount = 0; // 定位第一个元素
  }
  /* 入队 */
  enqueue(element) {
    this.queue[this.count++] = element;
  }
  /* 出队 */
  dequeue() {
    if (this.isEmpty()) return undefined;
    const element = this.queue[this.lowestCount];
    delete this.queue[this.lowestCount++];
    return element;
  }
  /* 查看队首元素 */
  peek() {
    if (this.isEmpty()) return undefined;
    return this.queue[this.lowestCount];
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
    this.queue = {};
    this.count = 0;
    this.lowestCount = 0;
  }
  toString() {
    // 不适用于元素是对象时 [object Object]
    if (this.isEmpty()) return "";
    let result = this.queue[this.lowestCount];
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      result = `${result},${this.queue[i]}`;
    }
    return result;
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.dequeue();
queue.dequeue();
console.log("---queue.toString()---:", queue.toString());

/**
 * 击鼓传花游戏
 * @param elementsList
 * @param num
 * @returns {{eliminated: [], winner: *}}
 */
function hotPotato(elementsList, num) {
  const queue = new Queue(); // {1}
  const eliminatedList = [];
  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i]); // {2}
  }
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()); // {3}
    }
    eliminatedList.push(queue.dequeue()); // {4}
  }
  return {
    eliminated: eliminatedList,
    winner: queue.dequeue() // {5}
  };
}

const names = ["John", "Jack", "Camila", "Ingrid", "Carl"];
const result = hotPotato(names, 7);

result.eliminated.forEach(name => {
  console.log(`${name}在击鼓传花游戏中被淘汰。 `);
});
console.log(`胜利者： ${result.winner}`);
