import React, { useState, useEffect } from "react";
import { ForceGraph } from "./forceGraph";
import Loader from "react-loader-spinner";

const Control = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/graph/9", {})
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
        setLoading(false);
      });
  }, []);
  const nodeHoverTooltip = React.useCallback((node) => {
    return `<div>${node.name}</div>`;
  }, []);
  return loading ? (
    <Loader
      className="centrar"
      type="TailSpin"
      color="#00BFFF"
      height={100}
      width={100}
    />
  ) : (
    <section className="Main">
      <ForceGraph
        linksData={data.links}
        nodesData={data.nodes}
        nodeHoverTooltip={nodeHoverTooltip}
      />
    </section>
  );
};

export default Control;
