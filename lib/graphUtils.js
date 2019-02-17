export function mapWhere(iterable, predicate, fn) {
  const out = [];
  for (let el of iterable) {
    if (predicate(el)) {
      out.push(fn(el));
    } else {
      out.push(el);
    }
  }
  return out;
}
