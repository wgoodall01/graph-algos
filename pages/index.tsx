import dynamic from "next/dynamic";

const Loading = () => (
  <div>
    <style jsx>{`
      div {
        /* cover the page */
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      p {
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.3rem;
        opacity: 0.5;
      }
    `}</style>
    <p>loading slides</p>
  </div>
);

export default dynamic(() => import("../pres"), {
  ssr: false,
  loading: Loading
});
