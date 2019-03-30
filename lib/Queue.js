export default class Queue {
  constructor(items = [], { priority = () => 0 } = {}) {
    this.items = items;
    this.priority = priority;
  }

  enque(el) {
    this.items.push(el);
    this.items.sort(this.priority); // really dank priority queue
  }

  deque() {
    return this.items.shift();
  }

  get front() {
    return this.items[0];
  }

  get back() {
    return this.items[this.items.length - 1];
  }

  get length() {
    return this.items.length;
  }
}
