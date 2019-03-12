import Queue from "../Queue";
import Path from "../Path";
import { getAdjacent, getOpposite } from "../graphUtils";

export function* dijkstra({ nodes, edges }, from, to) {
  const q = new Queue([new Path(from)]);
  const visited = new Map();

  while (q.length > 0) {
    let path = q.deque();
    // ----- highlight the node
    console.group(`node ${path.item}`);

    // if we have visited here before, but this path is shorter, update it.
    let previousPath = null;
    if (visited.has(path.item)) {
      previousPath = visited.get(path.item);

      if (path.weight >= previousPath.weight) {
        // we've found a mediocre/bad path, don't traverse down it
        console.groupEnd();
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
      // Check if we are at the destination
      // ----- highlight the final path
      console.log(`Found destination path: ${path.items()}`);
      // return path.items();
    } else {
      // Add all adjacent nodes to the queue
      for (let edge of getAdjacent(edges, path.item)) {
        // ----- highlight the edge
        const adj = getOpposite(edge, path.item);
        console.log(`adding adj: ${path.item} --${edge.weight || 0}-> ${adj}`);
        q.enque(path.append(adj, edge.weight || 0));
      }
    }

    console.groupEnd();
  }

  if (visited.has(to)) {
    // return the best path found
    return visited.get(to).items();
  } else {
    // no path found---must be disconnected
    return null;
  }
}

// Bidirectional dijkstra?
