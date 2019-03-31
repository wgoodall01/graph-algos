interface Edge {
  id: number;
  from: number;
  to: number;
  weight?: number;
}

interface Node {
  id: number;
  x?: number;
  y?: number;
}

export function mapWhere<T, R>(
  iterable: Iterable<T>,
  predicate: (e: T) => boolean,
  fn: (e: T) => R
): Array<R | T> {
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

export const withId = (id: number) => (e: Node | Edge) => e.id === id;

export const opposite = (id: number) => (edge: Edge) => getOpposite(edge, id);

export function getOpposite(edge: Edge, id: number): number | undefined {
  if (edge.from == id) {
    return edge.to;
  } else if (edge.to == id) {
    return edge.from;
  } else {
    return undefined;
  }
}

export const adjacentTo = (id: number) => (edge: Edge) =>
  edge.to == id || edge.from == id;

export const getById = (list: Array<Edge | Node>, id: number) =>
  list.filter(withId(id))[0];

export const getAdjacent = (edges: Array<Edge>, id: number) =>
  edges.filter(adjacentTo(id));

export const and = <T>(...predicates: Array<(e: T) => boolean>) => (e: T) =>
  predicates.every(fn => fn(e));

export const or = <T>(...predicates: Array<(e: T) => boolean>) => (e: T) =>
  predicates.some(fn => fn(e));
