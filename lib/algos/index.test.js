import { dijkstra } from "./dijkstra";
import { aStar } from "./aStar";
import { gather, end } from "../utils";
import {
  lattice,
  crossLattice,
  smallExample as exampleGraph
} from "../exampleGraphData";

describe.each([["dijkstra", dijkstra], ["aStar", aStar]])(
  "%s()",
  (name, algorithm) => {
    it("should find an obvious path", () => {
      const nodes = [1, 2, 3];
      const edges = [{ from: 1, to: 2 }, { from: 2, to: 3 }];

      const path = end(algorithm({ nodes, edges }, { from: 1, to: 3 }));
      expect(path.items()).toEqual([1, 2, 3]);
    });

    it("should find the right path in a weighted graph", () => {
      const path = end(algorithm(exampleGraph, { from: 1, to: 5 }));
      expect(path.items()).toEqual([1, 7, 3, 4, 5]);
    });

    it.each([2, 10])(
      "shouldn't find a stupid path in a %d^2 lattice graph",
      size => {
        const graph = lattice(size, { spacing: 1 }); // NxN square lattice
        const algo = algorithm(graph, {
          from: 0,
          to: size ** 2 - 1,
          heuristic: node =>
            Math.sqrt((size - node.x) ** 2 + (size - node.y) ** 2),
          earlyReturn: false
        });
        const path = end(algo);
        expect(path.weight).toEqual((size - 1) * 2);
      }
    );

    it.each([2, 5, 10])(
      "shouldn't find a stupid path in a %d^2 cross lattice graph",
      size => {
        const graph = crossLattice(size, { spacing: 1 }); // NxN square lattice
        const algo = algorithm(graph, {
          from: 0,
          to: size ** 2 - 1,
          heuristic: node =>
            Math.sqrt((size - node.x) ** 2 + (size - node.y) ** 2),
          earlyReturn: false
        });
        const path = end(algo);
        expect(path.weight).toEqual(size - 1);
      }
    );
  }
);

it("aStar() should run faster than dijkstra() over a 10^2 cross lattice", () => {
  const size = 10;
  const graph = crossLattice(size, { spacing: 1 });
  const { values: dijkstraSteps, final: dijkstraPath } = gather(
    dijkstra(graph, { from: 0, to: size ** 2 - 1, earlyReturn: true })
  );
  const { values: aStarSteps, final: aStarPath } = gather(
    aStar(graph, {
      from: 0,
      to: size ** 2 - 1,
      earlyReturn: true,
      heuristic: node => Math.sqrt((size - node.x) ** 2 + (size - node.y) ** 2)
    })
  );
  expect(dijkstraPath).not.toBeNull();
  expect(aStarPath).not.toBeNull();
  expect(aStarSteps.length).toBeLessThan(dijkstraSteps.length);
});
