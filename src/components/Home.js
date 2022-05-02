import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
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
      }
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    			<span className="navbar-toggler-icon"></span>
  			</button>
  			<div className="collapse navbar-collapse" id="navbarText">
    			<ul className="navbar-nav mr-auto">
					  <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Grafo
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="/#" onClick={()=>{setShow(2);}}>Leer archivo</a>
          <a class="dropdown-item"href="/#" onClick={()=>{setShow(1);}}>Grafo Random</a>
          <a class="dropdown-item" href="/#" onClick={()=>{setShow(3);}}>Crear Grafo</a>
          <a class="dropdown-item" href="/#" onClick={()=>{setShow(0);}}>Seleccionar Grafo</a>
        </div>
      </li>
    			</ul>
				
    			<span className="navbar-text">
      				
    			</span>
  			</div>
		</nav>
      </div>
        <div className="col-md-8">
            {
            show ===1?
            <div className="card-body">
              <button className="btn btn-primary" onClick={() => createGraphRandom()}>
                crear grafo random
              </button>
            </div>
            :show ===2?
            <div className="card-body">
              <h4>Crear desde archivo</h4>
              <input
                type="file"
                accept="application/JSON,.xml"
                name="files"
                onChange={(e) => setFiles(e.target.files[0])}
              />
              <br></br>
              <br></br>
              <button className="btn btn-primary" onClick={() => subirArchivo()}>
                Insertar Archivo
              </button>
            </div>
            : show ===3?
          
              <div className="card-body">
                <div className="form-group">
                  <div className="card-body">
                    <label>Nombre del grafo:</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="escribe el id del Nodo"
                      value={grafoNombre}
                      onChange={(e) => setGrafoNombre(e.target.value)}
                    />
                    <div className="card-footer">
                      <button
                        className="btn btn-primary"
                        onClick={() => createGraph()}
                      >
                        Crear Grafo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              :<div className="card-body">
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
                      <div className="card" style={{ maxWidth: "250px" }}>
                        <img
                          className="card-img-top"
                          src="https://revistadigital.inesem.es/informatica-y-tics/files/2017/03/Sin-t%C3%ADtulo-1.png"
                          alt={item.grafoName}
                          key={item.grafoId}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.grafoId}</h5>
                          <p className="card-text">{item.grafoName}</p>
                          <i
                            className="bi bi-trash"
                            style={{ float: "right" }}
                            onClick={() => deleteGraph(item.grafoId)}
                          >
                            ELIMINAR
                          </i>
    
                          <Link
                            to={"/grafo/" + item.grafoId}
                            className="btn btn-primary"
                          >
                            Go somewhere
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              </div>
            }
        </div>
      </div>
    </div>
  );
};

export default Home;
