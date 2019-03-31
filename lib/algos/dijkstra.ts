import { aStar, aStarOpts, aStarResult } from "./aStar";
import { Graph } from "../graphUtils";

export function dijkstra(
  { nodes, edges }: Graph,
  opts: aStarOpts
): aStarResult {
  // Delegate to aStar, with an empty heuristic
  const result = aStar({ nodes, edges }, { ...opts, heuristic: _ => 0 });
  return result;
}
