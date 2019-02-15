import React from "react";
import { DataSet, Network } from "vis";
import { bg, primary, secondary, text } from "../vars";

const nodes = new DataSet([
  { id: 1, label: "N1" },
  { id: 2, label: "N2" },
  { id: 3, label: "N3" },
  { id: 4, label: "N4" },
  { id: 5, label: "N5" },
  { id: 6, label: "N6" },
  { id: 7, label: "N7" }
]);

const edges = new DataSet([
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
  { from: 6, to: 7 },
  { from: 7, to: 1 },

  { from: 7, to: 3 },
  { from: 4, to: 7 }
]);

class GraphVis extends React.Component {
  static networkOptions = {
    edges: {
      color: "red",
      width: 5,
      smooth: false
    },
    nodes: {
      mass: 2
    },
    physics: false
  };

  componentDidMount() {
    const [width, height] = [this.el.clientWidth, this.el.clientHeight];

    this.network = new Network(
      this.el,
      { nodes, edges },
      { ...GraphVis.networkOptions, width: `${width}px`, height: `${height}px` }
    );
  }
  render() {
    return (
      <div ref={el => (this.el = el)}>
        <style jsx>{`
          div {
            flex: 1;
          }
        `}</style>
      </div>
    );
  }
}

export default GraphVis;
