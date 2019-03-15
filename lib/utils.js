export function end(iter) {
  let val = iter.next();
  while (!val.done) {
    val = iter.next();
  }
  return val.value;
}

export function gather(iter) {
  let values = [];
  let val = iter.next();
  while (!val.done) {
    values.push(val.value);
    val = iter.next();
  }

  const final = val.value;

  return { values, final };
}
