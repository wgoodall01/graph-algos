import Graph from "../components/Graph";
import { withId, adjacentTo, mapWhere } from "../lib/graphUtils";
import { text, secondary } from "../vars";
import { throttle } from "lodash";
import { crossLattice } from "../lib/exampleGraphData";
import { aStar } from "../lib/algos/aStar";
import { dijkstra } from "../lib/algos/dijkstra";
import AlgoWorker from "../lib/algoWorker.worker";

const LATTICE_SIZE = 12;

class ExampleGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 0,
      playing: false,
      steps: [],
      width: "100%",
      height: 600,
      progress: 0
    };
  }

  static defaultProps = {
    graph: crossLattice(LATTICE_SIZE, { spacing: 100 }),
    algorithm: "aStar",
    earlyReturn: false,
    to: LATTICE_SIZE ** 2 - 1,
    from: 0
  };

  componentDidMount() {
    const { graph, algorithm, to, from, earlyReturn } = this.props;

    this.worker = new AlgoWorker();
    this.worker.addEventListener("message", this._handleWorkerMessage);
    this.worker.postMessage({
      algorithm,
      graph,
      to,
      from,
      earlyReturn,
      heuristicTarget: { r: LATTICE_SIZE, c: LATTICE_SIZE }
    });
  }

  _handleWorkerMessage = ({ data }) => {
    if (data.type === "progress") {
      this._handleProgress(data);
    } else if (data.type === "done") {
      this.setState({ steps: data.steps, progress: false });
    }
  };

  _handleProgress = throttle(({ n, last }) => {
    this.setState(s => ({ progress: s.progress === false ? false : n }));
  }, 50);

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
    this.worker.terminate();
  }

  render() {
    const { steps, i, width, height, playing, progress } = this.state;
    const { scale, hideWeights } = this.props;
    const thisStep = steps[i];

    if (progress !== false) {
      return (
        <div>
          <style jsx>{`
            div {
              text-align: center;
              font-size: 1rem;
              text-transform: uppercase;
              letter-spacing: 0.3rem;
              opacity: 0.5;
            }
          `}</style>
          generating frame {progress}
        </div>
      );
    }

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
            <button onClick={this._handlePlay(3000 / steps.length)}>
              {">>"}
            </button>
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
            scale={scale}
            hideWeights={hideWeights}
          />
        )}
      </div>
    );
  }
}

export default ExampleGraph;
