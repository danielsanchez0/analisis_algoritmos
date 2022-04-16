import React, { useState, useEffect } from "react";
import { ForceGraph } from "./forceGraph";
import Loader from "react-loader-spinner";
import { Link, useParams, useHistory } from "react-router-dom";

const Control = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [idNodo, setIdNodo] = useState("");
  const [idTarget, setIdTarget] = useState("");
  const [idSource, setIdSource] = useState("");
  const [distance, setDistance] = useState("");
  const { grafoid } = useParams();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/graph/" + grafoid, {})
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
        setLoading(false);
      });
  }, []);
  const addNode = () => {
    console.log("PUT");
    console.log(idNodo);
    setLoading(true);
    fetch("http://127.0.0.1:8000/graph", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tarea: "addNode",
        grafoId: grafoid,
        id: idNodo,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addLink = () => {
    console.log("PUT");
    setLoading(true);
    fetch("http://127.0.0.1:8000/graph", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tarea: "addLinks",
        grafoId: parseInt(grafoid),
        source: parseInt(idSource),
        target: parseInt(idTarget),
        distance: parseInt(distance),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    <div className="row">
      <div className="col-md-3">
        <button id="saveButton">Export my D3 visualization to PNG</button>
        <div className="form-group">
          <div className="card-body">
            <label>idNodo:</label>
            <input
              className="form-control"
              type="text"
              placeholder="escribe el id del Nodo"
              value={idNodo}
              onChange={(e) => setIdNodo(e.target.value)}
            />

            <div className="card-footer">
              <button className="btn btn-primary" onClick={() => addNode()}>
                Agregar Nodo
              </button>
            </div>
          </div>

          <div className="card-body">
            <label>idSource:</label>
            <input
              className="form-control"
              type="text"
              placeholder="escribe el id del Nodo Origen"
              value={idSource}
              onChange={(e) => setIdSource(e.target.value)}
            />
            <label>idDestino:</label>
            <input
              className="form-control"
              type="text"
              placeholder="escribe el id del Nodo Destino"
              value={idTarget}
              onChange={(e) => setIdTarget(e.target.value)}
            />
            <label>Distancia:</label>
            <input
              className="form-control"
              type="text"
              placeholder="escribe la distancia entre nodos"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />

            <div className="card-footer">
              <button className="btn btn-primary" onClick={() => addLink()}>
                Agregar Arista
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-9">
        <section className="Main">
          <ForceGraph
            linksData={data.links}
            nodesData={data.nodes}
            nodeHoverTooltip={nodeHoverTooltip}
          />
        </section>
      </div>
    </div>
  );
};

export default Control;
