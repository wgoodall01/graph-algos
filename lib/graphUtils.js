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

export const opposite = id => edge => getOpposite(edge, id);

export const getOpposite = (edge, id) => {
  if (edge.from == id) {
    return edge.to;
  } else if (edge.to == id) {
    return edge.from;
  } else {
    return undefined;
  }
};

export const adjacentTo = id => edge => edge.to == id || edge.from == id;

export const getById = (list, id) => list.filter(withId(id))[0];

export const getAdjacent = (edges, id) => edges.filter(adjacentTo(id));

export const and = (...predicates) => e => predicates.every(fn => fn(e));
export const or = (...predicates) => e => predicates.some(fn => fn(e));
