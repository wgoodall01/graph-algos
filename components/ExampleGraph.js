import Graph from "../components/Graph";
import { withId, adjacentTo, mapWhere } from "../lib/graphUtils.js";

const nodes = [
  { id: 1, x: -201, y: -15 },
  { id: 2, x: -127, y: -218 },
  { id: 3, x: -9, y: -165 },
  { id: 4, x: 143, y: -131 },
  { id: 5, x: 256, y: 89 },
  { id: 6, x: 77, y: 88 },
  { id: 7, x: -55, y: 21 }
].map(e => ({ ...e, label: e.id.toString() }));

const edges = [
  { id: -1, from: 1, to: 2 },
  { id: -2, from: 2, to: 3 },
  { id: -3, from: 3, to: 4 },
  { id: -4, from: 4, to: 5 },
  { id: -5, from: 5, to: 6 },
  { id: -6, from: 6, to: 7 },
  { id: -7, from: 7, to: 1 },

  { id: -8, from: 7, to: 3 },
  { id: -9, from: 4, to: 7 }
];

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
