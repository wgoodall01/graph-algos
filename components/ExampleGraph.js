import Graph from "../components/Graph";
import { withId, adjacentTo, mapWhere } from "../lib/graphUtils.js";
import { gather } from "../lib/utils.js";
import exampleGraph from "../lib/exampleGraphData";
import { dijkstra } from "../lib/algos/dijkstra.js";

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
    graph: exampleGraph,
    algorithm: dijkstra,
    to: 5,
    from: 1
  };

  componentDidMount() {
    const { graph, algorithm, to, from } = this.props;
    const iter = algorithm(graph, 1, 5);

    const { values, final } = gather(iter);
    this.setState({ steps: values });
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
