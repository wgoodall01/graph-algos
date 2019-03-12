import Graph from "../components/Graph";
import { withId, adjacentTo, mapWhere } from "../lib/graphUtils.js";
import exampleGraph from "../lib/exampleGraphData";

const { nodes, edges } = exampleGraph;

class ExampleGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes,
      edges,
      width: 500,
      height: 600
    };
  }

  render() {
    const { nodes, edges, width, height } = this.state;
    return (
      <Graph
        nodes={nodes}
        edges={edges}
        width={width}
        height={height}
        draggable
        events={{
          click: evt => {
            const id = evt.nodes[0];
            if (!id) {
              return;
            }
            this.setState(state => ({
              nodes: mapWhere(state.nodes, withId(id), e => ({
                ...e,
                color: e.color ? null : "red"
              })),

              edges: mapWhere(state.edges, adjacentTo(id), e => ({
                ...e,
                color: e.color ? null : { color: "red" }
              }))
            }));
          },
          dragEnd: evt => {
            const nodeId = evt.nodes[0];
            this.setState(state => ({
              nodes: mapWhere(
                state.nodes,
                e => e.id == nodeId,
                e => ({
                  ...e,
                  x: evt.pointer.canvas.x,
                  y: evt.pointer.canvas.y
                })
              )
            }));
          }
        }}
      />
    );
  }
}

export default ExampleGraph;
