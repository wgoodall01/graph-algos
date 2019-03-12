export default class Path {
  constructor(item, prev = null, deltaWeight = 0) {
    this.prev = prev;
    this.item = item;
    this.deltaWeight = deltaWeight;
  }

  replaceFrom(other) {
    this.prev = other.prev;
    this.item = other.item;
    this.deltaWeight = other.deltaWeight;
    return this;
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

  get weight() {
    if (this.prev == null) {
      return this.deltaWeight;
    } else {
      const prevWeight = this.prev.weight;
      return prevWeight + this.deltaWeight;
    }
  }

  append(item, deltaWeight = 0) {
    return new Path(item, this, deltaWeight);
  }

  get length() {
    if (this.prev == null) {
      return 1;
    } else {
      return 1 + this.prev.length;
    }
  }
}
