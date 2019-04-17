import Queue from "../Queue";
import Path from "../Path";
import { getAdjacent, getOpposite, getById, Graph, Node } from "../graphUtils";
import { makeFrame } from "./view";

export interface progressArg {
  n: number; // number of frames
  last: Graph; // last frame
}
export interface aStarOpts {
  from: number;
  to: number;
  heuristic?: ((e: Node) => number) | null;
  earlyReturn?: boolean;
  progress?: (p: progressArg) => any;
}
export interface aStarResult {
  steps: Graph[];
  path: Path<number> | null;
}
export function aStar(
  { nodes, edges }: Graph,
  {
    from,
    to,
    heuristic = null,
    earlyReturn = false,
    progress = () => {}
  }: aStarOpts
): aStarResult {
  console.log("aStar: starting");
  // Make a priority queue, ranking elements by their heuristic values
  let priority = null;
  if (heuristic) {
    const estimatedCost = (path: Path<number>) => {
      const h = heuristic(getById(nodes, path.item) as Node); // TODO: remove this lookup
      return path.weight + h;
    };
    priority = (a: Path<number>, b: Path<number>) =>
      estimatedCost(a) - estimatedCost(b);
  }
  const q: Queue<Path<number>> = new Queue([new Path(from)], { priority });
  const visited: Map<number, Path<number>> = new Map();
  visited.set(from, new Path(from, null, 0));

  // keep track of the steps we take
  const steps: Graph[] = [];

  // Keep track of an annotated graph state that we can change
  let view = {
    nodes,
    edges: edges.map(e => ({
      ...e,
      ...(e.weight ? { label: e.weight.toString() } : {})
    }))
  };

  queueLoop: while (q.length > 0) {
    let path = q.deque() as Path<number>; // can't be undefined

    // Add all adjacent nodes to the queue
    for (let edge of getAdjacent(edges, path.item)) {
      const adj = getOpposite(edge, path.item) as number;
      let newPath = path.append(adj, edge.weight || 0);

      if (newPath.length >= 3 && newPath.item == newPath.prev!.prev!.item) {
        // ignore edges which just double back on the existing path.
        continue;
      }

      // Update the view with each edge
      steps.push(makeFrame({ graph: view, visited, currentPath: newPath }));
      progress({ n: steps.length, last: steps[steps.length - 1] });

      // update visited
      let oldPath = visited.get(adj);
      if (typeof oldPath !== "undefined") {
        if (newPath.weight < oldPath.weight) {
          newPath = oldPath.replaceFrom(newPath);
        }
        continue;
      }
      visited.set(adj, newPath);

      // return early, if enabled
      if (earlyReturn && adj === to) {
        break queueLoop;
      }

      q.enque(newPath);
    }
  }

  if (visited.has(to)) {
    const finalPath = visited.get(to) as Path<number>;

    // show the final path
    steps.push(
      makeFrame({ graph: view, visited, currentPath: finalPath, final: true })
    );

    // return the best path found
    return { steps, path: finalPath };
  } else {
    console.log("no path found");
    // no path found---must be disconnected
    return { steps, path: null };
  }
}
