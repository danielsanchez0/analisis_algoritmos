import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

const Home = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grafoNombre, setGrafoNombre] = useState("");
  const [files, setFiles] = useState("");

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
        <div className="col-md-8">
            <button className="btn btn-primary" onClick={() => createGraphRandom()}>
              crear grafo random
            </button>

          <input
            type="file"
            accept="application/JSON,.xml"
            name="files"
            onChange={(e) => setFiles(e.target.files[0])}
          />
          <br></br>
          <button className="btn btn-primary" onClick={() => subirArchivo()}>
            Insertar Archivo
          </button>
          <br></br>
          <br></br>
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
      </div>
    </div>
  );
};

export default Home;
