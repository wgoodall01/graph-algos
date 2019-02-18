import React from "react";
import { Network } from "vis";
import { bg, primary, secondary, text } from "../vars";
import PropTypes from "prop-types";

const buildOptions = ({ draggable, width, height }) => ({
  edges: {
    color: {
      color: secondary,
      highlight: primary
    },
    font: {
      color: text,
      strokeWidth: 6,
      strokeColor: secondary
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
    enabled: false
  },
  layout: { randomSeed: 1 },
  interaction: {
    dragView: false,
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
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    events: PropTypes.object.isRequired,
    draggable: PropTypes.bool
  };

  static defaultProps = {
    width: 600,
    height: 600,
    draggable: false,
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
      this.net.fit(); // for consistent size changes
    }

    // update events if they have changed
    if (nextProps.events !== props.events) {
      this._updateEvents(props, nextProps);
    }

    return false;
  }

  componentDidMount() {
    const { nodes, edges, width, height, events, draggable } = this.props;

    this.net = new Network(
      this.el,
      { nodes, edges },
      buildOptions({ width, height, draggable })
    );

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
