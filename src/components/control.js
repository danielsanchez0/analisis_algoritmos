import React, { useState, useEffect } from "react";
import { ForceGraph } from "./forceGraph";
import Loader from "react-loader-spinner";
import { Link, useParams, useHistory } from "react-router-dom";
import * as fs from "file-saver";
import fileDownload from "js-file-download";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-brands-svg-icons";
import "./control.css";
import Swal from "sweetalert2";

const Control = () => {
  const [show, setShow] = useState(0);
  const [data, setData] = useState("");
  const [dataQ, setDataQ] = useState("");
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
  const [nCluster, setNcluster] = useState("");

  const quey = () => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/quey/" + grafoid, {})
    .then((res) => res.json())
      .then((result) => {
        setDataQ(result);
        setLoading(false);
      });
  }

  const cluster = () => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/cluster/" + grafoid, {})
    .then((res) => res.json())
      .then((result) => {
        setDataQ(result);
        setLoading(false);
      });
  }

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
        setSelected2("Seleccione nodo");
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
        radius: parseInt(radiusD),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        changes.push(result);
        setTemporal(result);
        setData(result);
        setLoading(false);
        setRadius("");
      })
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
        setLoading(false);
      })
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
        setLoading(false);
      })
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
        distance: parseInt(distanceD),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        changes.push(result);
        setTemporal(result);
        setData(result);
        setLoading(false);
        setRadius("");
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
      index = changes.length - 1;
    } else {
      index = changes.length - 2;
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
        <nav class="navbar navbar-expand-lg py-1 navbar-light bg-light">
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Archivo
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li class="dropdown-submenu">
                      <a class="dropdown-item dropdown-toggle" href="#">
                        Guardar como
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            class="dropdown-item"
                            id="XML"
                            onClick={downloadXML}
                          >
                            XML
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" id="JSON" onClick={saveAs}>
                            JSON
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li class="dropdown-submenu">
                      <a class="dropdown-item dropdown-toggle" href="#">
                        Exportar Datos
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a class="dropdown-item" id="XLSX">
                            Excel
                          </a>
                        </li>
                        <li class="dropdown-submenu">
                          <a class="dropdown-item dropdown-toggle" href="#">
                            Imagen
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <a class="dropdown-item" id="PNG">
                                PNG
                              </a>
                            </li>
                            <li>
                              <a class="dropdown-item" id="JPEG">
                                JPEG
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a class="dropdown-item" id="PDF">
                            PDF
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Editar
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li class="dropdown-submenu">
                      <a class="dropdown-item dropdown-toggle" href="#">
                        Deshacer
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            class="dropdown-item"
                            href="#"
                            onClick={() => {
                              back();
                            }}
                          >
                            Último cambio
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="#"
                            onClick={() => {
                              resetGraph();
                            }}
                          >
                            Todos los cambios
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li class="dropdown-submenu">
                      <a class="dropdown-item dropdown-toggle" href="#">
                        Nodo
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            class="dropdown-item"
                            href="#"
                            onClick={() => {
                              setIdNodo("");
                              setRadius("");
                              setSelected("Seleccione Nodo");
                              setSelected2("Seleccione Nodo");
                              setIsActive(false);
                              setIsActive2(false);
                              setShow(1);
                            }}
                          >
                            Agregar
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="#"
                            onClick={() => {
                              setSelected("Seleccione Nodo");
                              setRadiusD("");
                              setIsActive(false);
                              setIsActive2(false);
                              setShow(4);
                            }}
                          >
                            Actualizar
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="#"
                            onClick={() => {
                              setSelected("Seleccione Nodo");
                              setRadiusD("");
                              setIsActive(false);
                              setIsActive2(false);
                              setShow(6);
                            }}
                          >
                            Eliminar
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li class="dropdown-submenu">
                      <a class="dropdown-item dropdown-toggle" href="#">
                        Arista
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            class="dropdown-item"
                            href="#"
                            onClick={() => {
                              setDistance("0");
                              setSelected("Seleccione Nodo");
                              setSelected2("Seleccione Nodo");
                              setIsActive(false);
                              setIsActive2(false);
                              setShow(2);
                            }}
                          >
                            Agregar
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="#"
                            onClick={() => {
                              setSelected("Seleccione Arista");
                              setDistanceD("");
                              setIsActive(false);
                              setIsActive2(false);
                              setShow(3);
                            }}
                          >
                            Actualizar
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            href="#"
                            onClick={() => {
                              setSelected("Seleccionar Arista");
                              setIsActive(false);
                              setIsActive2(false);
                              setShow(5);
                            }}
                          >
                            Eliminar
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Analizar
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li class="dropdown-submenu">
                      <a class="dropdown-item dropdown-toggle" href="#">
                        Algoritmos
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#" onClick={() => {
                          setIsActive(false);
                          setIsActive2(false);
                          quey();
                          setShow(7);}}>
                            Queyranne
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" onClick={() => {
                            setIsActive(false);
                            setIsActive2(false);
                            //cluster();
                            setShow(9);
                          }}>
                            Cluster
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" onClick={() => {}}>
                            Algoritmo 3
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#" onClick={() => {}}>
                            Algoritmo 4
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Aplicacion
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#" onClick={() => {}}>
                        Aplicación 1
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onClick={() => {}}>
                        Aplicación 2
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onClick={() => {}}>
                        Aplicación 3
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onClick={() => {}}>
                        Aplicación 4
                      </a>
                    </li>
                  </ul>
                </li>

                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Ventana
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#" onClick={() => {}}>
                        Gráfico
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onClick={() => {}}>
                        Tabla
                      </a>
                    </li>
                  </ul>
                </li>

                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Ayuda
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#" onClick={() => {}}>
                        Ayuda
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#" onClick={() => {}}>
                        Acerca de Grafos
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="col-md-3">
        {show === 1 ? ( // Agregar
          <div className="form-group">
            <div className="card-body">
              <br />
              <h2>Agregar Nodo</h2>
              <label>ID Nodo:</label>
              <input
                className="form-control"
                type="number"
                placeholder="escribe el id del Nodo"
                value={idNodo}
                onChange={(e) => {
                  setIdNodo(e.target.value);
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
              <br></br>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (idNodo === "") {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Ingrese un id para el nodo",
                    });
                  } else if (radius === "" || parseInt(radius) <= 0) {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "El valor del radio del nodo debe ser mayor que 0",
                    });
                  } else {
                    addNode();
                    setRadius("");
                    setIdNodo("");
                  }
                }}
              >
                Agregar Nodo
              </button>
            </div>
          </div>
        ) : show === 2 ? (
          <div className="card-body">
            <br />
            <h2>Agregar Arista</h2>
            <label>Nodo Origen: </label>
            <div className="dropdown">
              <div
                className="dropdown-btn"
                onClick={(e) => {
                  setIsActive(!isActive);
                  setIsActive2(false);
                }}
              >
                {selected}
                <span className="fas fa-caret-down"></span>
              </div>
              {isActive && (
                <div className="dropdown-content">
                  {data["nodes"].map((option) => (
                    <div
                      onClick={(e) => {
                        setSelected(option.id);
                        setIdSource(option.id);
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
                <div
                  className="dropdown-btn"
                  onClick={(e) => {
                    setIsActive2(!isActive2);
                    setIsActive(false);
                  }}
                >
                  {selected2}
                  <span className="fas fa-caret-down"></span>
                </div>
                {isActive2 && (
                  <div className="dropdown-content">
                    {data["nodes"].map((option) => (
                      <div
                        onClick={(e) => {
                          setSelected2(option.id);
                          setIdTarget(option.id);
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
            <br></br>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (selected === "Seleccione Nodo") {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Debe seleccionar un nodo origen",
                  });
                } else if (selected2 === "Seleccione Nodo") {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Debe seleccionar un nodo destino",
                  });
                } else if (distance === "0" || parseInt(distance) < 0) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "La distancia para la arista mayor que 0",
                  });
                } else {
                  addLink();
                  setDistance("0");
                  selected("Seleccione Nodo");
                  selected2("Seleccione Nodo");
                }
              }}
            >
              Agregar Arista
            </button>
          </div>
        ) : show === 3 ? ( // Editar
          <div className="card-body">
            <br />
            <h2>Editar Arista</h2>
            <label>Arista: </label>
            <div className="dropdown">
              <div
                className="dropdown-btn"
                onClick={(e) => {
                  setIsActive(!isActive);
                  setIsActive2(false);
                }}
              >
                {selected}
                <span className="fas fa-caret-down"></span>
              </div>
              {isActive && (
                <div className="dropdown-content">
                  {data["links"].map((option) => (
                    <div
                      onClick={(e) => {
                        setSelected(`N${option.source} - N${option.target}`);
                        setSourceD(option.source);
                        setTargetD(option.target);
                        setDistanceD(option.distance);
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
            <br></br>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (selected === "Seleccione Arista" && distanceD === "") {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Debe seleccionar una arista",
                  });
                } else if (
                  (distanceD === "" && selected !== "Seleccione Arista") ||
                  (parseInt(distanceD) < 0 && selected !== "Seleccione Arista")
                ) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "La distancia de la arista debe ser mayor que 0",
                  });
                } else {
                  updateLink();
                  setSelected("Seleccione Arista");
                  setDistanceD("");
                }
              }}
            >
              Actualizar Arista
            </button>
          </div>
        ) : show === 4 ? (
          <div className="card-body">
            <br />
            <h2>Editar Nodo</h2>
            <label>Nodo: </label>
            <div className="dropdown">
              <div
                className="dropdown-btn"
                onClick={(e) => {
                  setIsActive(!isActive);
                  setIsActive2(false);
                }}
              >
                {selected}
                <span className="fas fa-caret-down"></span>
              </div>
              {isActive && (
                <div className="dropdown-content">
                  {data["nodes"].map((option) => (
                    <div
                      onClick={(e) => {
                        setSelected(`N${option.id}`);
                        setNodoD(option.id);
                        // setIdSource(option.source)
                        setRadiusD(option.radius);
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

            <br></br>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (selected === "Seleccione Nodo") {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Seleccione un nodo",
                  });
                } else if (radiusD === "" || parseInt(radiusD) <= 0) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "El radio para el nodo debe ser mayor que 0",
                  });
                } else {
                  updateNode();
                  setSelected("Seleccione Nodo");
                  setRadiusD("");
                }
              }}
            >
              Actualizar Nodo
            </button>
          </div>
        ) : show === 5 ? (
          <div className="card-body">
            <br />
            <h2>Eliminar Arista</h2>
            <label>Arista: </label>
            <div className="dropdown">
              <div
                className="dropdown-btn"
                onClick={(e) => {
                  setIsActive(!isActive);
                  setIsActive2(false);
                }}
              >
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

            <button
              className="btn btn-primary"
              onClick={() => {
                if (selected === "Seleccionar Arista") {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Seleccione una arista",
                  });
                } else {
                  deleteLink();
                  setSelected("Seleccionar Arista");
                }
              }}
            >
              Eliminar Arista
            </button>
          </div>
        ) : show === 6 ? (
          // Eliminar
          <div className="card-body">
            <br />
            <h2>Eliminar Nodo</h2>
            <label>Nodo: </label>
            <div className="dropdown">
              <div
                className="dropdown-btn"
                onClick={(e) => {
                  setIsActive(!isActive);
                  setIsActive2(false);
                }}
              >
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

            <button
              className="btn btn-primary"
              onClick={() => {
                console.log("tengo " + selected);
                if (selected === "Seleccionar Nodo") {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Seleccione un nodo",
                  });
                } else {
                  deleteNode();
                  setSelected("Seleccionar Nodo");
                }
              }}
            >
              Eliminar Nodo
            </button>
          </div>
        ): show === 7 ? (
          <div className="card-body">
            <br />
            <h2>Información</h2>
            <label>Segmentos:  </label>
            <label>{dataQ.segmentos}</label>
            <br></br>
            <label>Tiempo:</label>
            <br></br>
            <label>{dataQ.tiempo}</label>

            <br></br>
          </div>
        ) :show === 8 ? (
          <div className="card-body">
            <br />
            <h2>Información</h2>
            <label>Clusters:  </label>
            <label>{dataQ.segmentos}</label>
            <br></br>
            <label>Tiempo:</label>
            <br></br>
            <label>{dataQ.tiempo}</label>

            <br></br>
          </div>
        ): show == 9?
        (
          <div className="form-group">
            <div className="card-body">
              <br />
              <h2>Cluster</h2>
              <label>Número de clusters:</label>
              <input
                className="form-control"
                type="number"
                placeholder="Escriba el número de clusters"
                value={nCluster}
                onChange={(e) => {
                  setNcluster(e.target.value);
                }}
              />
              <br></br>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (nCluster === "") {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Ingrese un número de clusters",
                    });
                  } else if (parseInt(nCluster) <= 0) {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "El número de clusters debe ser mayor que 0",
                    });
                  } else {
                    cluster();
                    setShow(8);
                    setNcluster("");
                  }
                }}
              >
                Agregar Nodo
              </button>
            </div>
          </div>
        ):
         (
          <div class="card-body">
            <h5 class="card-title">Seleccione una opción del Menú</h5>
          </div>
        )}
      </div>
      <div
        className="col-md-9
      "
      >{dataQ ?(
        <section className="Main">
          <ForceGraph
            linksData={data.links}
            nodesData={data.nodes}
            nodeHoverTooltip={nodeHoverTooltip}
          />
          <ForceGraph
            linksData={dataQ.links}
            nodesData={dataQ.nodes}
            nodeHoverTooltip={nodeHoverTooltip}
          />
        </section>):
        ( <section className="Main">
        <ForceGraph
          linksData={data.links}
          nodesData={data.nodes}
          nodeHoverTooltip={nodeHoverTooltip}
        />
      </section>)

      }
        
      </div>
    </div>
  );
};

export default Control;
