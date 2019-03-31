import Graph from "../components/Graph";
import { withId, adjacentTo, mapWhere } from "../lib/graphUtils";
import { crossLattice } from "../lib/exampleGraphData";
import { aStar } from "../lib/algos/aStar";
import { dijkstra } from "../lib/algos/dijkstra";

const LATTICE_SIZE = 10;

class ExampleGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 0,
      playing: false,
      steps: [],
      width: 500,
      height: 600
    };
  }

  static defaultProps = {
    graph: crossLattice(LATTICE_SIZE, { spacing: 100 }),
    algorithm: aStar,
    to: LATTICE_SIZE ** 2 - 1,
    from: 0
  };

  componentDidMount() {
    const { graph, algorithm, to, from } = this.props;
    const { steps } = algorithm(graph, {
      from,
      to,
      earlyReturn: true,
      heuristic: node =>
        Math.sqrt((LATTICE_SIZE - node.r) ** 2 + (LATTICE_SIZE - node.c) ** 2)
    });

    this.setState({ steps });
  }

  _handleStep = d => () => {
    this.setState(e => {
      let x = e.i + d;
      if (x >= 0 && x < e.steps.length) {
        return { i: x };
      } else {
        return { playing: false };
      }
    });
  };

  _handlePlay = dt => () => {
    this.setState({ playing: dt || false });
  };

  componentDidUpdate(prevProps, prevState) {
    const { playing } = this.state;
    if (playing && (prevState.i !== this.state.i || !prevState.playing)) {
      setTimeout(this._handleStep(playing > 0 ? 1 : -1), playing);
    }
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    const { steps, i, width, height, playing } = this.state;
    const thisStep = steps[i];
    return (
      <div>
        <button onClick={() => this.setState({ i: 0 })}>{0}</button>
        <button onClick={this._handleStep(-1)}>{"<"}</button>
        <input
          type="range"
          step={1}
          min={0}
          max={steps.length - 1}
          value={i}
          onChange={e => this.setState({ i: parseInt(e.target.value) })}
        />
        <button onClick={this._handleStep(1)}>{">"}</button>
        {playing ? (
          <button onClick={this._handlePlay(0)}>{"x"}</button>
        ) : (
          <button onClick={this._handlePlay(200)}>{">>"}</button>
        )}
        <span>
          step {i + 1} of {steps.length}, playing={playing.toString()}
        </span>
        {thisStep && (
          <Graph
            nodes={thisStep.nodes}
            edges={thisStep.edges}
            width={width}
            height={height}
          />
        )}
      </div>
    );
  }
}

export default ExampleGraph;
