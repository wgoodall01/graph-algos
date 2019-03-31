import { dijkstra } from "./dijkstra";
import { aStar, aStarResult } from "./aStar";
import {
  lattice,
  crossLattice,
  smallExample as exampleGraph
} from "../exampleGraphData";
import Path from "../Path";
import { Node } from "../graphUtils";

interface PathResult extends aStarResult {
  path: Path<number>;
}

for (let algorithm of [dijkstra, aStar]) {
  describe(`${algorithm.name}()`, () => {
    it("should find an obvious path", () => {
      const nodes = [1, 2, 3].map(e => ({ id: e, x: 0, y: 0 }));
      const edges = [{ id: -1, from: 1, to: 2 }, { id: -2, from: 2, to: 3 }];

      const { path } = algorithm(
        { nodes, edges },
        { from: 1, to: 3 }
      ) as PathResult;
      expect(path.items()).toEqual([1, 2, 3]);
    });

    it("should find the right path in a weighted graph", () => {
      const { path } = algorithm(exampleGraph, {
        from: 1,
        to: 5
      }) as PathResult;
      expect(path.items()).toEqual([1, 7, 3, 4, 5]);
    });

    it.each([2, 10])(
      "shouldn't find a stupid path in a %d^2 lattice graph",
      size => {
        const graph = lattice(size, { spacing: 1 }); // NxN square lattice
        const { path } = algorithm(graph, {
          from: 0,
          to: size ** 2 - 1,
          heuristic: (node: Node) =>
            Math.sqrt((size - node.x) ** 2 + (size - node.y) ** 2),
          earlyReturn: false
        }) as PathResult;
        expect(path.weight).toEqual((size - 1) * 2);
      }
    );

    it.each([2, 5, 10])(
      "shouldn't find a stupid path in a %d^2 cross lattice graph",
      size => {
        const graph = crossLattice(size, { spacing: 1 }); // NxN square lattice
        const { path } = algorithm(graph, {
          from: 0,
          to: size ** 2 - 1,
          heuristic: (node: Node) =>
            Math.sqrt((size - node.x) ** 2 + (size - node.y) ** 2),
          earlyReturn: false
        }) as PathResult;
        expect(path.weight).toEqual(size - 1);
      }
    );
  });
}

it("aStar() should run faster than dijkstra() over a 10^2 cross lattice", () => {
  const size = 10;
  const graph = crossLattice(size, { spacing: 1 });

  const { steps: dijkstraSteps, path: dijkstraPath } = dijkstra(graph, {
    from: 0,
    to: size ** 2 - 1,
    earlyReturn: true
  }) as PathResult;

  const { steps: aStarSteps, path: aStarPath } = aStar(graph, {
    from: 0,
    to: size ** 2 - 1,
    earlyReturn: true,
    heuristic: (node: Node) =>
      Math.sqrt((size - node.x) ** 2 + (size - node.y) ** 2)
  }) as PathResult;

  expect(dijkstraPath).not.toBeNull();
  expect(aStarPath).not.toBeNull();
  expect(aStarSteps.length).toBeLessThan(dijkstraSteps.length);
});
