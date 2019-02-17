import React from 'react';
import {DataSet, Network} from 'vis';
import {bg, primary, secondary, text} from '../vars';
import PropTypes from 'prop-types';

const options = {
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
    shape: 'circle',
    color: {
      background: secondary,
      highlight: primary
    }
  },
  physics: {
    enabled: false
  },
  layout: {randomSeed: 1},
  interaction: {dragView: false, dragNodes: false, selectConnectedEdges: false},
  manipulation: {enabled: false}
};

class Graph extends React.Component {
  static propTypes = {
    nodes: PropTypes.array.isRequired,
    edges: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  };

  static defaultProps = {
    width: 600,
    height: 600
  };

  shouldComponentUpdate(nextProps, nextState) {
    const props = this.props;
    if (nextProps.nodes !== props.nodes || nextProps.edges !== props.edges) {
      this.net.setData({nodes: nextProps.nodes, edges: nextProps.edges});
    }
    if (nextProps.width !== props.width || nextProps.width !== props.width) {
      const {width, height} = nextProps;
      this.net.setSize(`${width}px`, `${height}px`);
    }
    return false;
  }

  componentDidMount() {
    const {nodes, edges, width, height} = this.props;

    this.net = new Network(
      this.el,
      {nodes, edges},
      {...options, width: `${width}px`, height: `${height}px`}
    );

    if (process.env.NODE_ENV === 'development') {
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
