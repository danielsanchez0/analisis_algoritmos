import React, { useState, useEffect } from "react";
import { ForceGraph } from "./forceGraph";
import Loader from "react-loader-spinner";
import { Link, useParams, useHistory } from "react-router-dom";
import * as fs from "file-saver";
import fileDownload from "js-file-download";
import { FontAwesomeIcon }   from "@fortawesome/react-fontawesome";
import {} from '@fortawesome/free-brands-svg-icons'
import "./control.css";


const Control = () => {
  const [show, setShow] = useState(0);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [idNodo, setIdNodo] = useState("");
  const [radius, setRadius] = useState(0);
  const [idTarget, setIdTarget] = useState("");
  const [idSource, setIdSource] = useState("");
  const [distance, setDistance] = useState("");
  const { grafoid } = useParams();
  const [bandera, setBander] = useState("");
  const [temporal, setTemporal] = useState("");
  const [isShowing, setIsShowing] = useState(true);
  const [changes, setChanges] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [selected, setSelected] = useState("Seleccione nodo");
  const [selected2, setSelected2] = useState("Seleccione nodo");
  const [agregar, setAgregar] = useState("Agregar Arista");
  const [cont, setCont] = useState(0);

  const saveAs = async () => {
    const handle = await window.showSaveFilePicker({
      suggestedName: "grafo.json",
      types: [
        {
          description: "JSON",
          accept: { "doc/json": [".json"] },
        },
      ],
      excludeAcceptAllOption: true,
    });
    const writer = await handle.createWritable();
    await writer.write(JSON.stringify(temporal));
    await writer.close();
  };

  const saveAsXML = async (dataBlod) => {
    const handle = await window.showSaveFilePicker({
      suggestedName: "grafo.xml",
      types: [
        {
          description: "XML",
          accept: { "doc/xml": [".xml"] },
        },
      ],
      excludeAcceptAllOption: true,
    });
    const writer = await handle.createWritable();
    await writer.write(dataBlod);
    await writer.close();
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/graph/" + grafoid, {})
      .then((res) => res.json())
      .then((result) => {
        setChanges([...changes, result]);
        setBander(result);
        setTemporal(result);
        setData(result);
        setLoading(false);
      });
  }, []);
  const addNode = () => {
    console.log("PUT");
    //console.log("tengo ", { bandera });
    setLoading(true);
    fetch("http://127.0.0.1:8000/graph", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tarea: "addNode",
        grafoId: parseInt(grafoid),
        id: parseInt(idNodo),
        radius: parseInt(radius),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setTemporal(result);
        changes.push(result);
        //saveData(result);
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
        changes.push(result);
        setTemporal(result);
        setData(result);
        setLoading(false);
        setSelected("Seleccione nodo");
        setSelected2("Seleccione nodo")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetGraph = () => {
    console.log("Cambios ", changes);
    setLoading(true);
    fetch("http://127.0.0.1:8000/graph", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tarea: "reset",
        grafoId: bandera["grafoId"],
        grafoName: bandera["grafoName"],
        nodes: bandera["nodes"],
        links: bandera["links"],
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setTemporal(result);
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const back = () => {
    let index = 0;
    if (changes.length === 1) {
      index = changes.length-1;
    }else{
      index = changes.length -2;
    }
    console.log("vuelve ", changes[changes.length-1]["grafoId"]);
    setLoading(true);
    fetch("http://127.0.0.1:8000/graph", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tarea: "back",
        grafoId: changes[index]["grafoId"],
        grafoName: changes[index]["grafoName"],
        nodes: changes[index]["nodes"],
        links: changes[index]["links"],
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadXML = () => {
    fetch("http://127.0.0.1:8000/xml/" + grafoid, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        fetch(result.link, {
          method: "GET",
          headers: {
            "Content-Type": "application/xml",
          },
        })
          .then((response) => response.blob())
          .then((blob) => {
            saveAsXML(blob);
          });
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
      <div className="col-md-12">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    			<span className="navbar-toggler-icon"></span>
  			</button>
  			<div className="collapse navbar-collapse" id="navbarText">
    			<ul className="navbar-nav mr-auto">
					  <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Archivo
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" id='XML' onClick={downloadXML}>Export XML</a>
          <a class="dropdown-item" id='JSON' onClick={saveAs}>Exportar JSON</a>
          <a class="dropdown-item" id='PDF'>Export PDF</a>
		      <a class="dropdown-item" id='XLSX'>Export Excel</a>
          <a class="dropdown-item" id='PNG'>Export PNG</a>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Editar
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" id='AddN' onClick={()=>{setShow(0);}}>Agregar...</a>
          <a class="dropdown-item" id='edN' onClick={()=>{setShow(1);}}>Editar Nodo</a>
          <a class="dropdown-item" id='delN' onClick={()=>{setShow(2);}}>Eliminar Nodo</a>
        </div>
      </li>
      
      
    			</ul>
				
    			<span className="navbar-text">
      				
    			</span>
  			</div>
		</nav>
      </div>
      <div className="col-md-3">
      {show === 1?
        <div className="form-group">
          <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              if (isShowing) {
                setAgregar("Agregar Nodo");
              } else {
                setAgregar("Agregar Arista");
              }
              setIsShowing(!isShowing); }}
          >
            {agregar}
          </button>
          {isShowing ? (
            <div className="card-body">
              
              <h2>Agregar Nodo</h2>
              <label>idNodo:</label>
              <input
                className="form-control"
                type="text"
                placeholder="escribe el id del Nodo"
                value={idNodo}
                onChange={(e) => {setIdNodo(e.target.value);
              }}
              />
              <label>Radio:</label>
              <input
                className="form-control"
                type="text"
                placeholder="escribe el radio del Nodo"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
              />

              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => addNode()}>
                  Agregar Nodo
                </button>
              </div>
            </div>
          ) : (
            <div className="card-body">
              <h2>Agregar Arista</h2>
              <label>Nodo Origen: </label>
              <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => {setIsActive(!isActive); setIsActive2(false);}}>
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {data["nodes"].map((option) => (
            <div
              onClick={(e) => {
                setSelected(option.id);
                setIdSource(option.id)
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option.id}
            </div>
          ))}
        </div>
      )}
    </div>
              <br></br>
              <label>Nodo Destino: </label>
              <div className="chosen-wrapper">
              <div className="dropdown">
      <div className="dropdown-btn" onClick={(e) => {setIsActive2(!isActive2); setIsActive(false);}}>
        {selected2}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive2 && (
        <div className="dropdown-content">
          {data["nodes"].map((option) => (
            <div
              onClick={(e) => {
                setSelected2(option.id);
                setIdTarget(option.id)
                setIsActive2(false);
              }}
              className="dropdown-item"
            >
              {option.id}
            </div>
          ))}
        </div>
      )}
    </div>
              </div>
              <br></br>
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
          )}
        </div>
        : <h1>d</h1>
        }
      </div>
      <div className="col-md-9">
        <section className="Main">
          <ForceGraph
            linksData={data.links}
            nodesData={data.nodes}
            nodeHoverTooltip={nodeHoverTooltip}
          />
        </section>

        <div className="card-footer">
          <button className="btn btn-primary" onClick={() => resetGraph()}>
            Descartar cambios
          </button>
          <button className="btn btn-primary" onClick={() => back()}>
            Descartar último
          </button>
          {/* <button className="btn btn-primary" onClick={() => saveAs()}>
            Guardar información
          </button>
          <button className="btn btn-primary" onClick={() => downloadXML()}>
            Export XML
          </button> */}
          {/* <button id="saveButton" className="btn btn-primary">
            Export PNG
          </button> */}
          {/* <button id="exportarpdf"> exportar PDF</button>
          <button id="exportXLSX"> exportar EXCEL</button> */}
        </div>
      </div>
    </div>
  );
};

export default Control;
