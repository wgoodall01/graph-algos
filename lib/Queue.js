export default class Queue {
  constructor(items = []) {
    this.items = items;
  }

  enque(el) {
    this.items.push(el);
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
