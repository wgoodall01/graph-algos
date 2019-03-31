import { Graph, Node, assertUnique } from "./graphUtils";

export const smallExample = {
  nodes: [
    { id: 1, x: -201, y: -15 },
    { id: 2, x: -127, y: -218 },
    { id: 3, x: -9, y: -165 },
    { id: 4, x: 143, y: -131 },
    { id: 5, x: 256, y: 89 },
    { id: 6, x: 77, y: 88 },
    { id: 7, x: -55, y: 21 }
  ],
  edges: [
    { id: -1, from: 1, to: 2, weight: 1 },
    { id: -2, from: 2, to: 3, weight: 3 },
    { id: -3, from: 3, to: 4, weight: 1 },
    { id: -4, from: 4, to: 5, weight: 1 },
    { id: -5, from: 5, to: 6, weight: 1 },
    { id: -6, from: 6, to: 7, weight: 10 },
    { id: -7, from: 7, to: 1, weight: 1 },
    { id: -8, from: 7, to: 3, weight: 1 },
    { id: -9, from: 4, to: 7, weight: 10 }
  ]
};

interface LatticeOpts {
  spacing: number;
}
export function lattice(
  size: number,
  { spacing }: LatticeOpts = { spacing: 1 }
): Graph {
  const coord = (r: number, c: number) => r * size + c;
  const mkId = (coord: number, delta: number) => 1000 * coord + delta;

  let nodes = [];
  let edges = [];
  // iterate over rows, cols
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const node = {
        id: coord(r, c),
        x: c * spacing,
        y: r * spacing,
        r,
        c
      } as Node;
      nodes.push(node);
    }
  }

  // Add in all the edges
  for (let r = 1; r < size; r++) {
    for (let c = 1; c < size; c++) {
      edges.push({
        from: coord(r, c),
        to: coord(r - 1, c),
        weight: 1,
        id: -mkId(coord(r, c), 0)
      });
      edges.push({
        from: coord(r, c),
        to: coord(r, c - 1),
        weight: 1,
        id: -mkId(coord(r, c), 1)
      });
    }
  }

  // Add edges connecting the first row and column
  for (let n = 1; n < size; n++) {
    edges.push({
      from: coord(0, n),
      to: coord(0, n - 1),
      weight: 1,
      id: -mkId(coord(0, n), 2)
    });
    edges.push({
      from: coord(n, 0),
      to: coord(n - 1, 0),
      weight: 1,
      id: -mkId(coord(n, 0), 3)
    });
  }

  assertUnique({ nodes, edges });
  return { nodes, edges };
}

export function crossLattice(size: number, opts: LatticeOpts): Graph {
  const coord = (r: number, c: number) => r * size + c;
  const mkId = (coord: number, delta: number) => 1000 * coord + delta;

  let { nodes, edges } = lattice(size, opts);

  for (let r = 1; r < size; r++) {
    for (let c = 1; c < size; c++) {
      edges.push({
        from: coord(r - 1, c - 1),
        to: coord(r, c),
        weight: 1,
        id: -mkId(coord(r, c), 4)
      });
      edges.push({
        from: coord(r - 1, c),
        to: coord(r, c - 1),
        weight: 1,
        id: -mkId(coord(r, c), 5)
      });
    }
  }

  assertUnique({ nodes, edges });
  return { nodes, edges };
}
