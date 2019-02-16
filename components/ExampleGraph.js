import Graph from "../components/Graph";

const nodes = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 }
];

const edges = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
  { from: 6, to: 7 },
  { from: 7, to: 1 },

  { from: 7, to: 3 },
  { from: 4, to: 7 }
];

class ExampleGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes,
      edges
    };
  }

  render() {
    const { nodes, edges } = this.state;
    return <Graph nodes={nodes} edges={edges} />;
  }
}

export default ExampleGraph;
