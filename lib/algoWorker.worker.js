import { dijkstra } from "./algos/dijkstra";
import { aStar } from "./algos/aStar";

const algoFuncs = {
  dijkstra,
  aStar
};

self.addEventListener("message", event => {
  const {
    algorithm: algoName,
    graph,
    from,
    to,
    earlyReturn,
    heuristicTarget
  } = event.data;
  const algorithm = algoFuncs[algoName];

  const result = algorithm(graph, {
    from,
    to,
    earlyReturn,
    heuristic: node =>
      (1 / 2) *
      Math.sqrt(
        (heuristicTarget.r - node.r) ** 2 + (heuristicTarget.c - node.c) ** 2
      ),
    progress: ({ n, last }) => self.postMessage({ type: "progress", n, last })
  });

  self.postMessage({ type: "done", ...result });
});
