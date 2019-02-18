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

export const withId = id => e => e.id == id;

export const adjacentTo = id => edge => edge.to == id || edge.from == id;

export const getById = (list, id) => list.filter(withId(id))[0];

export const getAdjacent = (edges, id) => edges.filter(adjacentTo(id));
