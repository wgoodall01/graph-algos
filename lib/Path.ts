export default class Path<T> {
  item: T;
  prev: Path<T> | null;
  deltaWeight: number;

  constructor(item: T, prev: Path<T> | null = null, deltaWeight: number = 0) {
    this.prev = prev;
    this.item = item;
    this.deltaWeight = deltaWeight;
  }

  replaceFrom(other: Path<T>) {
    this.prev = other.prev;
    this.item = other.item;
    this.deltaWeight = other.deltaWeight;
    return this;
  }

  items(): Array<T> {
    if (this.prev == null) {
      return [this.item];
    } else {
      const prevItems = this.prev.items();
      prevItems.push(this.item);
      return prevItems;
    }
  }

  get weight(): number {
    if (this.prev == null) {
      return this.deltaWeight;
    } else {
      const prevWeight = this.prev.weight;
      return prevWeight + this.deltaWeight;
    }
  }

  append(item: T, deltaWeight: number = 0): Path<T> {
    return new Path(item, this, deltaWeight);
  }

  get length(): number {
    if (this.prev == null) {
      return 1;
    } else {
      return 1 + this.prev.length;
    }
  }
}
