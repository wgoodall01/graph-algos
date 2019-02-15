import { layoutWidth, layoutPad } from "../vars";

const LayoutContainer = ({ children }) => (
  <div>
    <style jsx>{`
      div {
        margin: 0 auto;
        max-width: ${layoutWidth};
        padding: 0 ${layoutPad};
        width: 100%;
      }
    `}</style>
    {children}
  </div>
);

export default LayoutContainer;
