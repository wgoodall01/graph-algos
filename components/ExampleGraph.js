import Graph from '../components/Graph';
import {mapWhere} from '../lib/graphUtils';

const nodes = [
  {id: 1, x: -201, y: -15},
  {id: 2, x: -127, y: -218},
  {id: 3, x: -9, y: -165},
  {id: 4, x: 143, y: -131},
  {id: 5, x: 256, y: 89},
  {id: 6, x: 77, y: 88},
  {id: 7, x: -55, y: 21}
];

const edges = [
  {from: 1, to: 2},
  {from: 2, to: 3, label: 'test'},
  {from: 3, to: 4},
  {from: 4, to: 5, label: 'another test label'},
  {from: 5, to: 6},
  {from: 6, to: 7},
  {from: 7, to: 1},

  {from: 7, to: 3},
  {from: 4, to: 7}
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
    const {nodes, edges} = this.state;
    return <Graph nodes={nodes} edges={edges} />;
  }
}

export default ExampleGraph;
