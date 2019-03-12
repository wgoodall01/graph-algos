export function end(iter) {
  let val = iter.next();
  while (!val.done) {
    val = iter.next();
  }
  return val.value;
}
