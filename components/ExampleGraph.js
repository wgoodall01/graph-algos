import Graph from "../components/Graph";
import { withId, adjacentTo, mapWhere } from "../lib/graphUtils";
import { text, secondary } from "../vars";
import { crossLattice } from "../lib/exampleGraphData";
import { aStar } from "../lib/algos/aStar";
import { dijkstra } from "../lib/algos/dijkstra";

const LATTICE_SIZE = 4;

class ExampleGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 0,
      playing: false,
      steps: [],
      width: "100%",
      height: 600
    };
  }

  static defaultProps = {
    graph: crossLattice(LATTICE_SIZE, { spacing: 100 }),
    algorithm: aStar,
    earlyReturn: false,
    to: LATTICE_SIZE ** 2 - 1,
    from: 0
  };

  componentDidMount() {
    const { graph, algorithm, to, from, earlyReturn } = this.props;
    const { steps } = algorithm(graph, {
      from,
      to,
      earlyReturn,
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
        <style jsx>{`
          .controls {
            font-size: smaller;
            display: flex;
            justify-content: center;
            margin-right: -0.5rem;
          }

          .controls > * {
            margin-right: 0.5rem;
          }

          .controls button {
            width: 3rem;
            background: ${secondary};
            color: ${text};
            border-radius: 0.3rem;
            border: none;
            font-size: inherit;
          }

          .number {
            display: inline-block;
            width: 3rem;
          }

          .number.right {
            text-align: right;
          }
        `}</style>
        <div className="controls">
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
            <button onClick={this._handlePlay(100)}>{">>"}</button>
          )}
          <span>
            <span className="number right">{i + 1}</span> /{" "}
            <span className="number">{steps.length}</span>
          </span>
        </div>
        {thisStep && (
          <Graph
            nodes={thisStep.nodes}
            edges={thisStep.edges}
            width={width}
            height={height}
            scale={this.props.scale}
          />
        )}
      </div>
    );
  }
}

export default ExampleGraph;
