import React from "react";
import { DataSet, Network } from "vis";
import { bg, primary, secondary, text } from "../vars";

const options = {
  edges: {
    color: {
      color: secondary,
      highlight: primary
    },
    width: 5,
    smooth: false
  },
  nodes: {
    mass: 1,
    borderWidth: 0,
    shape: "circle",
    color: {
      background: secondary,
      highlight: primary
    }
  },
  physics: {
    enabled: true,
    solver: "barnesHut",
    barnesHut: {
      damping: 0.3,
      centralGravity: 0.8
    },
    stabilization: {
      iterations: 2000
    }
  },
  layout: { randomSeed: 1 },
  interaction: { dragView: false }
};

class Graph extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    this.net.setData({ nodes: nextProps.nodes, edges: nextProps.edges });
    return false;
  }

  componentDidMount() {
    const [width, height] = [this.el.clientWidth, this.el.clientHeight];
    const { nodes, edges } = this.props;

    this.net = new Network(
      this.el,
      { nodes, edges },
      { ...options, width: `${width}px`, height: `${height}px` }
    );

    if (process.env.NODE_ENV === "development") {
      window.net = this.net;
    }
  }
  render() {
    return (
      <div className="Graph">
        <style jsx>{`
          .Graph {
            flex: 1;
            display: flex;
            flex-direction: column;
          }

          .tools {
            flex: 0;
          }
          .net {
            flex: 1;
            height: 100%;
          }
        `}</style>
        <div className="tools">
          <button onClick={() => this.net.addNodeMode()}>Add Vertex</button>
          <button onClick={() => this.net.addEdgeMode()}>Add Edge</button>
        </div>
        <div className="net" ref={el => (this.el = el)} />
      </div>
    );
  }
}

export default Graph;
