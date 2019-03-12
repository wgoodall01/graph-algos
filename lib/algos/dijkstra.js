import Queue from "../Queue";
import Path from "../Path";
import { getAdjacent, getOpposite } from "../graphUtils";

export function* dijkstra({ nodes, edges }, from, to) {
  const q = new Queue([new Path(from)]);

  while (q.length > 0) {
    const path = q.deque();
    // ----- highlight the node
    console.group(`node ${path.item}`);

    if (path.item == to) {
      // Check if we are at the destination
      // ----- highlight the final path
      console.log(`Found destination path: ${path.items()}`);
      return path.items();
    } else {
      // Add all adjacent nodes to the queue
      for (let adj of getAdjacent(edges, path.item).map(e =>
        getOpposite(e, path.item)
      )) {
        // ----- highlight the edge
        console.log(`adding adj: ${path.item} -> ${adj}`);
        q.enque(path.append(adj));
      }
    }

    console.groupEnd();
  }

  return null; // no path found---must be not connected
}

// Bidirectional dijkstra?
