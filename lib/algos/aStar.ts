import Queue from "../Queue";
import Path from "../Path";
import {
  adjacentTo,
  getAdjacent,
  getOpposite,
  getById,
  Graph,
  Edge,
  Node
} from "../graphUtils";

function updateView(view: Graph, path: Path<number>, adj: number): Graph {
  return {
    nodes: view.nodes.map(node => {
      if (node.id == path.item || node.id == adj) {
        return { ...node, color: "white" };
      }
      return node;
    }),
    edges: view.edges.map(edge => {
      if (adjacentTo(adj)(edge) && adjacentTo(path.item)(edge)) {
        return { ...edge, color: { color: "white" } };
      }
      return edge;
    })
  };
}

function makeFrame(view: Graph, path: Path<number>, adj: number) {
  let frame = { ...view };

  const nodesAlong = path.items();
  const along = (el: Edge | Node) => {
    if ("from" in el && "to" in el) {
      // el is an edge
      const i1 = nodesAlong.indexOf(el.to);
      const i2 = nodesAlong.indexOf(el.from);

      return i1 !== -1 && i2 !== -1 && Math.abs(i2 - i1) == 1;
    }

    // el is a node
    if (nodesAlong.indexOf(el.id) !== -1) {
      return true;
    }
  };

  frame.nodes = frame.nodes.map(node => {
    if (along(node)) {
      return { ...node, color: "orange" };
    }
    return node;
  });

  frame.edges = frame.edges.map(edge => {
    if (adjacentTo(adj)(edge) && adjacentTo(path.item)(edge)) {
      return {
        ...edge,
        color: { color: "orange" },
        arrows: "to",
        from: path.item,
        to: adj
      };
    }
    if (along(edge)) {
      return { ...edge, color: { color: "orange" } };
    }
    return edge;
  });

  return frame;
}

export interface aStarOpts {
  from: number;
  to: number;
  heuristic?: ((e: Node) => number) | null;
  earlyReturn?: boolean;
}
export interface aStarResult {
  steps: Graph[];
  path: Path<number> | null;
}
export function aStar(
  { nodes, edges }: Graph,
  { from, to, heuristic = null, earlyReturn = false }: aStarOpts
): aStarResult {
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

  while (q.length > 0) {
    let path = q.deque() as Path<number>; // can't be undefined

    // if we have visited here before, but this path is shorter, update it.
    if (visited.has(path.item)) {
      let previousPath = visited.get(path.item) as Path<number>;

      if (path.weight >= previousPath.weight) {
        // we've found a mediocre/bad path, don't traverse down it
        continue;
      }

      // if we've found a shorter path
      // Update the shortest path in `found`, update our path to reference it.
      path = previousPath.replaceFrom(path);
    } else {
      // add this path
      visited.set(path.item, path);
    }

    if (path.item == to) {
      // there's nothing to do if we're already there
    } else {
      // Add all adjacent nodes to the queue
      for (let edge of getAdjacent(edges, path.item)) {
        const adj = getOpposite(edge, path.item) as number;

        // Update the view with each edge
        view = updateView(view, path, adj);
        steps.push(makeFrame(view, path, adj));

        // return early, if enabled
        if (earlyReturn && adj == to) {
          return { steps, path };
        }

        q.enque(path.append(adj, edge.weight || 0));
      }
    }
  }

  if (visited.has(to)) {
    // return the best path found
    return { steps, path: visited.get(to) || null };
  } else {
    // no path found---must be disconnected
    return { steps, path: null };
  }
}
