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
  const [radiusD, setRadiusD] = useState("");
  const [sourceD, setSourceD] = useState("");
  const [targetD, setTargetD] = useState("");
  const [distanceD, setDistanceD] = useState("");
  const [nodoD, setNodoD] = useState("");
  const [sourceE, setSourceE] = useState("");
  const [targetE, setTargetE] = useState("");
  const [nodoE, setNodoE] = useState("");

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

  const updateNode = () => {
    //console.log("Cambios ", changes);
    setLoading(true);
    fetch("http://127.0.0.1:8000/graph", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tarea: "updateNode",
        grafoId: parseInt(grafoid),
        id: parseInt(nodoD),
        radius: parseInt(radiusD)
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        changes.push(result);
        setTemporal(result);
        setData(result);
        setLoading(false);
        setRadius("");      })
      .catch((err) => {
        console.log(err);
      });
  };


  const deleteLink = () => {
    //console.log("Cambios ", changes);
    setLoading(true);
    fetch("http://127.0.0.1:8000/graph", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tarea: "removeLink",
        grafoId: parseInt(grafoid),
        source: parseInt(sourceE),
        target: parseInt(targetE),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        changes.push(result);
        setTemporal(result);
        setData(result);
        setLoading(false);})
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNode = () => {
    //console.log("Cambios ", changes);
    setLoading(true);
    fetch("http://127.0.0.1:8000/graph", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tarea: "removeNode",
        grafoId: parseInt(grafoid),
        id: parseInt(nodoE),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        changes.push(result);
        setTemporal(result);
        setData(result);
        setLoading(false);})
      .catch((err) => {
        console.log(err);
      });
  };



  const updateLink = () => {
    //console.log("Cambios ", changes);
    setLoading(true);
    fetch("http://127.0.0.1:8000/graph", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tarea: "updateLink",
        grafoId: parseInt(grafoid),
        source: parseInt(sourceD),
        target: parseInt(targetD),
        distance: parseInt(distanceD)
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        changes.push(result);
        setTemporal(result);
        setData(result);
        setLoading(false);
        setRadius("");})
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
    //console.log("vuelve ", changes[changes.length-1]["grafoId"]);
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
          <a class="dropdown-item" id='AddN' onClick={()=>{setShow(1);isShowing(true)}}>Agregar...</a>
          <a class="dropdown-item" id='edN' onClick={()=>{setShow(2); isShowing(true);}}>Editar...</a>
          {/* <a class="dropdown-item" id='delN' onClick={()=>{setShow(2);isShowing(true)}}>Eliminar Nodo</a> */}
        </div>
      </li>
      
      
    			</ul>
				
    			<span className="navbar-text">
      				
    			</span>
  			</div>
		</nav>
      </div>
      <div className="col-md-3">
      
      {show === 1? // Agregar
        
        <div className="form-group">
          {isShowing ? (
            <div className="card-body">
              <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsShowing(false); 
            setIdNodo("");
          setRadius("");}}
          >
            Agregar Arista
          </button>
              <h2>Agregar Nodo</h2>
              <label>idNodo:</label>
              <input
                className="form-control"
                type="number"
                placeholder="escribe el id del Nodo"
                value={idNodo}
                onChange={(e) => {setIdNodo(e.target.value);
              }}
              />
              <label>Radio:</label>
              <input
                className="form-control"
                type="number"
                placeholder="escribe el radio del Nodo"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
              />

              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => {addNode()
                setRadius("");
                setIdNodo("");}}>
                  Agregar Nodo
                </button>
              </div>
            </div>
          ) : (
            <div className="card-body">
              <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsShowing(true);
              selected("Seleccione Nodo");
              selected2("Seleccione Nodo"); 
            setDistance("");}}
          >
            Agregar Nodo
          </button>
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
                <button className="btn btn-primary" onClick={() => {addLink();
                setDistance("0");
                selected("Seleccione Nodo");
                selected2("Seleccione Nodo");}}>
                  Agregar Arista
                </button>
              </div>
            </div>
          )}
        </div>

        : show === 2?  // Editar 
        <div>
          {isShowing ?(<div className="card-body"> <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsShowing(false); 
              setRadiusD("");
              setSelected("Seleccione Nodo")}}
          >
            Editar Nodo
          </button>
            <h2>Editar Arista</h2>
            <label>Arista: </label>
            <div className="dropdown">
          <div className="dropdown-btn" onClick={(e) => {setIsActive(!isActive); setIsActive2(false);}}>
            {selected}
            <span className="fas fa-caret-down"></span>
          </div>
          {isActive && (
            <div className="dropdown-content">
              {data["links"].map((option) => (
                <div
                  onClick={(e) => {
                    setSelected(`N${option.source} - N${option.target}`);
                    setSourceD(option.source)
                    setTargetD(option.target)
                    setDistanceD(option.distance)
                    setIsActive(false);
                  }}
                  className="dropdown-item"
                >
                  N{option.source} - N{option.target}
                </div>
              ))}
            </div>
          )}
          </div>
        <br></br>
        <label>Distancia:</label>
        <input
          className="form-control"
          type="number"
          placeholder="escribe la distancia entre nodos"
          value={distanceD}
          onChange={(e) => setDistanceD(e.target.value)}
        />

        <div className="card-footer">
          <button className="btn btn-primary" onClick={() => {updateLink();
          setSelected("Seleccione Arista");
          setDistanceD("");}}>
            Actualizar Arista
          </button>
        </div></div>):(<div className="card-body"> <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsShowing(true); 
              setSelected("Seleccione Arista");
            setRadiusD("");}}
          >
            Editar Arista
          </button>
            <h2>Editar Nodo</h2>
            <label>Nodo: </label>
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
                    setSelected(`N${option.id}`);
                    setNodoD(option.id)
                    // setIdSource(option.source)
                    setRadiusD(option.radius)
                    setIsActive(false);
                  }}
                  className="dropdown-item"
                >
                  N{option.id}
                </div>
              ))}
            </div>
          )}
          </div>
        <br></br>
        <label>Radio:</label>
        <input
          className="form-control"
          type="number"
          placeholder="escribe el radio del nodo"
          value={radiusD}
          onChange={(e) => setRadiusD(e.target.value)}
        />

        <div className="card-footer">
          <button className="btn btn-primary" onClick={() => {updateNode();
          setSelected("Seleccione Nodo");
          setRadiusD("")}}>
            Actualizar Nodo
          </button>
        </div></div>)}
          
      </div>




      :
      // Eliminar
      <div>
        {isShowing? (<div className="card-body">
            <br />
            <button
              className="btn btn-primary"
              onClick={() => {
                setIsShowing(false); 
                setSelected("Seleccionar Nodo")}}
            >
              Eliminar  Nodo
            </button>
              <h2>Eliminar Arista</h2>
              <label>Arista: </label>
              <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) => {setIsActive(!isActive); setIsActive2(false);}}>
              {selected}
              <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
              <div className="dropdown-content">
                {data["links"].map((option) => (
                  <div
                    onClick={(e) => {
                      setSelected(`N${option.source} - N${option.target}`);
                      setSourceE(option.source);
                      setTargetE(option.target);
                      setIsActive(false);
                    }}
                    className="dropdown-item"
                  >
                    N{option.source} - N{option.target}
                  </div>
                ))}
              </div>
            )}
            </div>
          <br></br>
          
          <div className="card-footer">
            <button className="btn btn-primary" onClick={() => {deleteLink();setSelected("Seleccionar Arista");}}>
              Eliminar Arista
            </button>
          </div>
        </div>):
        
        (<div className="card-body">
        <br />
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsShowing(true); 
            setSelected("Seleccionar Arista")}}
        >
          Eliminar  Nodo
        </button>
          <h2>Eliminar Nodo</h2>
          <label>Nodo: </label>
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
                  setSelected(`N${option.id}`);
                  setNodoE(option.id);
                  setIsActive(false);
                }}
                className="dropdown-item"
              >
                N{option.id}
              </div>
            ))}
          </div>
        )}
        </div>
      <br></br>
      
      <div className="card-footer">
        <button className="btn btn-primary" onClick={() => {deleteNode();setSelected("Seleccionar Nodo");}}>
          Eliminar Nodo
        </button>
      </div>
    </div>)
        
}
      </div>   
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
        </div>
      </div>
    </div>
  );
};

export default Control;
