import Queue from "../Queue";
import Path from "../Path";
import {
  adjacentTo,
  and,
  mapWhere,
  getAdjacent,
  getOpposite
} from "../graphUtils";

const updateView = (view, path, adj) => ({
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
});

const makeFrame = (view, path, adj) => {
  let frame = { ...view };
  const nodesAlong = path.items();
  const along = el =>
    nodesAlong.indexOf(el.id) != -1 ||
    (nodesAlong.indexOf(el.to) != -1 && nodesAlong.indexOf(el.from) != -1);

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
};

export function* dijkstra({ nodes, edges }, from, to) {
  const q = new Queue([new Path(from)]);
  const visited = new Map();

  // Keep track of an annotated graph state that we can change
  let view = {
    nodes,
    edges: edges.map(e => ({
      ...e,
      label: e.weight ? e.weight.toString() : undefined
    }))
  };

  while (q.length > 0) {
    let path = q.deque();

    // if we have visited here before, but this path is shorter, update it.
    let previousPath = null;
    if (visited.has(path.item)) {
      previousPath = visited.get(path.item);

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
      // Do nothing
    } else {
      // Add all adjacent nodes to the queue
      for (let edge of getAdjacent(edges, path.item)) {
        const adj = getOpposite(edge, path.item);

        // Update the view with each edge
        view = updateView(view, path, adj);
        yield makeFrame(view, path, adj);

        q.enque(path.append(adj, edge.weight || 0));
      }
    }
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
