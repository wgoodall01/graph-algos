import Path from "../Path";
import { Graph, Node, Edge } from "../graphUtils";
import { primary, secondary, text } from "../../vars";

const showActiveNode = (n: Node) =>
  ({
    ...n,
    color: primary,
    font: {
      color: secondary
    }
  } as Node);

const showVisitedNode = (n: Node) =>
  ({
    ...n,
    color: text,
    font: {
      color: secondary
    }
  } as Node);

const showActiveEdge = (e: Edge) =>
  ({
    ...e,
    color: { color: "orange" }
  } as Edge);

const showVisitedEdge = (e: Edge) =>
  ({
    ...e,
    color: { color: "white" }
  } as Edge);

interface MakeFrameArgs {
  graph: Graph;
  visited: Map<number, Path<number>>;
  currentPath: Path<number>;
  final?: boolean;
}

export function makeFrame({
  graph,
  visited,
  currentPath,
  final = false
}: MakeFrameArgs): Graph {
  const nodes = graph.nodes.map(node => {
    let decorated = { ...node };
    // highlight nodes on the current path

    if (visited.has(node.id)) {
      const visitPath = visited.get(node.id) as Path<number>;
      decorated.label = visitPath.weight.toString();
      decorated = showVisitedNode(decorated);
    }

    if (currentPath.prev !== null && currentPath.prev.has([node.id])) {
      decorated = showActiveNode(decorated);
    }

    // for the final frame, show the last node active and with cost
    if (final && node.id === currentPath.item) {
      decorated.label = currentPath.weight.toString();
      decorated = showActiveNode(decorated);
    }

    return decorated;
  });

  const edges = graph.edges.map(edge => {
    let decorated = { ...edge };
    let arrows = { from: false, to: false };

    // highlight visited edges with arrows
    const toPath = visited.get(edge.to);
    const fromPath = visited.get(edge.from);
    if (toPath && fromPath) {
      if (toPath.has([edge.from, edge.to])) {
        decorated = showVisitedEdge(decorated);
        arrows.to = true;
      }
      if (fromPath.has([edge.to, edge.from])) {
        decorated = showVisitedEdge(decorated);
        arrows.from = true;
      }
      decorated.arrows;
    }

    // highlight edges on the current path
    if (currentPath.has([edge.from, edge.to])) {
      decorated = showActiveEdge(decorated);
      arrows.to = true;
    }
    if (currentPath.has([edge.to, edge.from])) {
      decorated = showActiveEdge(decorated);
      arrows.from = true;
    }

    decorated.arrows = arrows;
    return decorated;
  });

  return { nodes, edges };
}
