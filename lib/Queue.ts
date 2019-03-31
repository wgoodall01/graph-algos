type priorityFn<T> = (a: T, b: T) => number;

export default class Queue<T> {
  private items: Array<T>;
  priority: priorityFn<T> | null;

  constructor(
    items: Array<T> = [],
    { priority }: { priority: priorityFn<T> | null } = { priority: null }
  ) {
    this.items = items;
    this.priority = priority;
    this.sort();
  }

  private sort() {
    if (this.priority != null) {
      this.items.sort(this.priority); // really dank priority queue
    }
  }

  enque(el: T) {
    this.items.push(el);
    this.sort();
  }

  deque(): T | undefined {
    return this.items.shift();
  }

  get front(): T | undefined {
    return this.items[0];
  }

  get back(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get length(): number {
    return this.items.length;
  }
}
