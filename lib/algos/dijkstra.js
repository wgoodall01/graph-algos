import { aStar } from "./aStar";

export function* dijkstra({ nodes, edges }, opts) {
  // Delegate to aStar, with an empty heuristic
  const path = yield* aStar({ nodes, edges }, { ...opts, heuristic: e => 0 });
  return path;
}
