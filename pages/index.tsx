import ExampleGraph from "../components/ExampleGraph";
import AsideSection from "../components/AsideSection";

export default () => (
  <div>
    <style jsx>{`
      .title {
        font-size: 3rem;
      }
    `}</style>
    <AsideSection>
      <header>
        <h1 className="title">Graph Demo</h1>
      </header>
    </AsideSection>
    <AsideSection aside={<ExampleGraph algorithm="dijkstra" />}>
      <h2>This is Dijkstra's Algorithm</h2>
      <p>Here's some description---</p>
      <ul>
        <li>How it works</li>
        <li>Implementation (maybe?)</li>
        <li>
          Advantages, disadvantages, scope (big-O, negative cost cycles, etc)
        </li>
      </ul>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
    </AsideSection>
    <AsideSection aside={<ExampleGraph earlyReturn={true} />}>
      <h2>...and this is A*</h2>
      <p>Again, some description here---</p>
      <ul>
        <li>How it's different from Dijkstra</li>
        <li>Implementation: priority queue</li>
        <li>maybe: link the source on GH?</li>
      </ul>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
      <p>-- --</p>
    </AsideSection>
  </div>
);
