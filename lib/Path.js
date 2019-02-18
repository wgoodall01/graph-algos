export default class Path {
  constructor(item, prev = null) {
    this.prev = prev;
    this.item = item;
  }

  items() {
    if (this.prev == null) {
      return [this.item];
    } else {
      const prevItems = this.prev.items();
      prevItems.push(this.item);
      return prevItems;
    }
  }

  append(item) {
    return new Path(item, this);
  }

  get length() {
    if (this.prev == null) {
      return 1;
    } else {
      return 1 + this.prev.length;
    }
  }
}
