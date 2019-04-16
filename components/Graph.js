import React from "react";
import { Network } from "vis";
import { bg, primary, secondary, text } from "../vars";
import PropTypes from "prop-types";

const buildOptions = ({ draggable, width, height }) => ({
  edges: {
    color: {
      color: secondary,
      highlight: secondary
    },
    chosen: {
      edge: () => ({ width: 5 })
    },
    font: {
      color: text,
      strokeWidth: 1,
      strokeColor: "black"
    },
    arrows: {
      to: { scaleFactor: 0.5 },
      from: { scaleFactor: 0.5 }
    },
    width: 2,
    smooth: true
  },
  nodes: {
    borderWidth: 0,
    shape: "circle",
    color: {
      background: secondary,
      highlight: secondary
    },
    font: {
      color: text
    }
  },
  physics: {
    enabled: false
  },
  layout: { randomSeed: 1 },
  interaction: {
    dragView: false,
    zoomView: false,
    dragNodes: draggable,
    selectConnectedEdges: false
  },
  manipulation: { enabled: false },
  width: `${width}px`,
  height: `${height}px`
});

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.net = null; //store the network object from vis.js
    this.events = {
      // "click": <function, from props>
    };
  }

  static propTypes = {
    nodes: PropTypes.array.isRequired,
    edges: PropTypes.array.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    events: PropTypes.object.isRequired,
    scale: PropTypes.number,
    draggable: PropTypes.bool
  };

  static defaultProps = {
    width: "100%",
    height: 500,
    draggable: false,
    scale: 1,
    events: {}
  };

  _updateEvents(oldEvents = {}, newEvents = {}) {
    const eventNames = new Set([
      ...Object.keys(oldEvents),
      ...Object.keys(newEvents)
    ]);

    for (let eventName of eventNames) {
      const oldEvent = oldEvents[eventName];
      const newEvent = newEvents[eventName];

      if (oldEvent) {
        this.net.off(eventName, oldEvent);
      }
      if (newEvent) {
        this.net.on(eventName, newEvent);
      }
    }
  }

  _resize() {
    const { scale } = this.props;
    this.net.fit();
    if (scale != null) {
      this.net.moveTo({ scale });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const props = this.props;

    if (nextProps.nodes !== props.nodes || nextProps.edges !== props.edges) {
      this.net.setData({ nodes: nextProps.nodes, edges: nextProps.edges });
    }

    // props which update options
    const optionsProps = ["width", "height", "draggable"];
    if (optionsProps.some(e => props[e] !== nextProps[e])) {
      this.net.setOptions(
        buildOptions({
          width: nextProps.width,
          height: nextProps.height,
          draggable: nextProps.draggable
        })
      );
    }

    // update events if they have changed
    if (nextProps.events !== props.events) {
      this._updateEvents(props, nextProps);
    }

    this._resize(); // for consistent size changes

    return false;
  }

  componentDidMount() {
    const { nodes, edges, width, height, events, draggable } = this.props;

    this.net = new Network(
      this.el,
      { nodes, edges },
      buildOptions({ width, height, draggable })
    );
    this._resize();

    this._updateEvents({}, events);

    if (process.env.NODE_ENV === "development") {
      window.net = this.net;
    }
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

export default Graph;
