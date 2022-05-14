import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./control.css";
import Loader from "react-loader-spinner";

const Home = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grafoNombre, setGrafoNombre] = useState("");
  const [files, setFiles] = useState("");
  const [show, setShow] = useState(0);

  const loadFiles = (e) => {
    setFiles(e);
  };

  const subirArchivo = () => {
    setLoading(true);
    console.log(files);
    const dataArchivo = new FormData();
    dataArchivo.append("myfile", files);

    fetch("http://127.0.0.1:8000/archivo", {
      method: "POST",
      body: dataArchivo,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLoading(false);
        history.push("/grafo/" + result.grafoId);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/graph", {
      headers: {},
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      });
  }, []);

  const createGraphRandom = () => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/randomgraph", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        history.push("/grafo/" + result.grafoId);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createGraph = () => {
    setLoading(true);
    console.log(grafoNombre);
    fetch("http://127.0.0.1:8000/graph", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grafoName: grafoNombre,
        nodes: [],
        links: [],
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

  const deleteGraph = (id) => {
    setLoading(true);
    console.log(grafoNombre);
    fetch("http://127.0.0.1:8000/graph/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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

  return (
    <div className="home">
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
                      Opciones Grafo
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          onClick={() => {
                            setShow(2);
                          }}
                        >
                          Leer archivo
                        </a>
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          onClick={() => {
                            setShow(1);
                          }}
                        >
                          Grafo random
                        </a>
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          onClick={() => {
                            setShow(3);
                          }}
                        >
                          Crear Grafo
                        </a>
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          href="#"
                          onClick={() => {
                            setShow(0);
                          }}
                        >
                          Seleccionar Grafo
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="col-md-8">
          {show === 1 ? (
            <div className="form-group">
              <div className="card-body">
                <br />
                <h2>Crear Grafo Random</h2>
                <label>Cantidad de nodos</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Escribe la cantidad de nodos para el grafo"
                  value=""
                  onChange={(e) => {}}
                />
                <label>Cantidad de Aristas</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Escriba la cantidad de aristas para Grafo"
                  value=""
                  onChange={(e) => {}}
                />
                <br></br>
                <button
                  className="btn btn-primary"
                  onClick={() => createGraphRandom()}
                >
                  crear grafo random
                </button>
              </div>
            </div>
          ) : show === 2 ? (
            <div className="card-body">
              <h4>Crear grafo desde archivo</h4>
              <input
                type="file"
                accept="application/JSON,application/xml"
                name="files"
                onChange={(e) => setFiles(e.target.files[0])}
              />
              <br></br>
              <br></br>
              <button
                className="btn btn-primary"
                onClick={() => subirArchivo()}
              >
                Insertar Archivo
              </button>
            </div>
          ) : show === 3 ? (
            <div className="card-body">
              <div className="form-group">
                <div className="card-body">
                  <h4>Crear Grafo</h4>
                  <label>Nombre del grafo:</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="escribe el id del Nodo"
                    value={grafoNombre}
                    onChange={(e) => setGrafoNombre(e.target.value)}
                  />
                  <br></br>
                  <button
                    className="btn btn-primary"
                    onClick={() => createGraph()}
                  >
                    Crear Grafo
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-body">
              <h4>Grafos disponibles</h4>
              {loading ? (
                <Loader
                  className="centrar"
                  type="TailSpin"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
              ) : (
                <div className="gallery">
                  {data.map((item) => {
                    return (
                      <div className="card mb-5" style={{ maxWidth: "250px" }}>
                        <br></br>
                        <img
                          className="card-img-top"
                          src="https://revistadigital.inesem.es/informatica-y-tics/files/2017/03/Sin-t%C3%ADtulo-1.png"
                          alt={item.grafoName}
                          key={item.grafoId}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.grafoId}</h5>
                          <p className="card-text">{item.grafoName}</p>
                          <p
                            className="btn btn-danger col-5"
                            style={{ float: "right" }}
                            onClick={() => deleteGraph(item.grafoId)}
                          >
                            Eliminar
                          </p>

                          <Link
                            to={"/grafo/" + item.grafoId}
                            className="btn btn-primary col-5"
                          >
                            Abrir
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
