import { Slide, Deck, Heading, Text } from "spectacle";
import { bg, secondary, primary, text } from "../vars";
import { dijkstra } from "../lib/algos/dijkstra";
import CodeSlide from "spectacle-code-slide";
import createTheme from "./theme/index.js";
import Graph from "../components/Graph";
import ExampleGraph from "../components/ExampleGraph";
import { smallExample, crossLattice } from "../lib/exampleGraphData";

import { InlineMath as IM } from "react-katex";

const theme = createTheme();

const Presentation = ({}) => (
  <Deck progress="bar" theme={theme} transition={["slide"]}>
    <Slide>
      <Heading>Graph Traversal Algorithms</Heading>
      <Text>Getting from A to B</Text>
    </Slide>
    <Slide>
      <Heading>What is a graph?</Heading>
      <Text>Simply put, a graph is made up of vertices and edges.</Text>
      <Text>A vertex is a point where edges can connect.</Text>
      <Text>
        Each edge (v<sub>1</sub> — v<sub>2</sub>) is a thing that connects two
        vertices.
      </Text>
      <Text>
        Edges can also have weights: a number representing how hard they are to
        traverse.
      </Text>
    </Slide>
    <Slide>
      <Graph
        nodes={smallExample.nodes.map(n => ({ ...n, label: n.id.toString() }))}
        edges={smallExample.edges.map(e => ({
          ...e,
          label: e.weight.toString()
        }))}
        scale={1.5}
      />
    </Slide>
    <Slide>
      <Heading>Dijkstra's Algorithm</Heading>
      <Text>
        Dijkstra's Algorithm is a specific type of graph traversal algorithm,
        designed to find the shortest path between two vertices.
      </Text>
    </Slide>
    <CodeSlide
      lang="js"
      code={require("raw-loader!./dijkstra-pseudocode.txt").default}
      ranges={[
        { loc: [0, 20] },
        { loc: [0, 3], note: "What we need to keep track of" },
        { loc: [6, 9], note: "Iterating through the queue" },
        { loc: [10, 12], note: "Iterating through adjacent vertices" },
        { loc: [13, 16], note: "When we find a shorter path" },
        { loc: [17, 18], note: "When we find a shorter path" },
        { loc: [19, 20], note: "What the algorithm gives us" },
        { loc: [0, 20] }
      ]}
    />
    <Slide>
      <ExampleGraph
        graph={smallExample}
        algorithm={dijkstra}
        from={1}
        to={5}
        scale={1.5}
      />
    </Slide>
    <Slide>
      <ExampleGraph
        graph={crossLattice(5, { spacing: 80 })}
        algorithm={dijkstra}
        from={0}
        to={5 ** 2 - 1}
        scale={1.5}
      />
    </Slide>
  </Deck>
);

export default Presentation;
