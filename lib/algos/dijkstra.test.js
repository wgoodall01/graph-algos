import { dijkstra } from "./dijkstra";
import { end } from "../utils";
import exampleGraph from "../exampleGraphData";

describe("dijkstra()", () => {
  it("should find an obvious path", () => {
    const nodes = [1, 2, 3];
    const edges = [{ from: 1, to: 2 }, { from: 2, to: 3 }];

    const path = end(dijkstra({ nodes, edges }, 1, 3));
    expect(path).toEqual([1, 2, 3]);
  });

  it("should find the right path in a weighted graph", () => {
    const path = end(dijkstra(exampleGraph, 1, 5));
    expect(path).toEqual([1, 7, 3, 4, 5]);
  });
});
