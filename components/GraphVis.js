import React from "react";
import { DataSet, Network } from "vis";
import { bg, primary, secondary, text } from "../vars";

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

class GraphVis extends React.Component {
  static networkOptions = {
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

  componentDidMount() {
    const [width, height] = [this.el.clientWidth, this.el.clientHeight];

    this.net = new Network(
      this.el,
      { nodes, edges },
      { ...GraphVis.networkOptions, width: `${width}px`, height: `${height}px` }
    );

    if (process.env.NODE_ENV === "development") {
      window.net = this.net;
    }
  }
  render() {
    return (
      <div className="GraphVis">
        <style jsx>{`
          .GraphVis {
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

export default GraphVis;
