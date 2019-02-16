import LayoutContainer from "../components/LayoutContainer";
import { primary } from "../vars";
import ExampleGraph from "../components/ExampleGraph.js";

export default () => (
  <div>
    <style jsx>{`
      div {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      header {
        flex: 0;
      }

      section {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    `}</style>
    <LayoutContainer>
      <header>
        <h1>Graph Demo</h1>
      </header>
    </LayoutContainer>
    <section>
      <ExampleGraph />
    </section>
  </div>
);
