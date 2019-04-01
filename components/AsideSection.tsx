import React from "react";

type Props = {
  aside?: React.ReactNode;
  children: React.ReactNode;
};

const AsideSection: React.FC<Props> = ({ aside, children }) => (
  <section>
    <style jsx>{`
      section {
        display: flex;
        flex-direction: row;
        max-width: 80rem;
        margin: 0 auto;
      }

      section > aside {
        flex: 0;
        flex-basis: 40rem;
        user-select: none;
      }

      section > div {
        flex: 1;
      }

      .sticky {
        width: 100%;
        position: sticky;
        top: 5rem;

        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 2rem;
      }
    `}</style>
    <aside>{aside && <div className="sticky">{aside}</div>}</aside>
    <div>{children}</div>
  </section>
);

export default AsideSection;
