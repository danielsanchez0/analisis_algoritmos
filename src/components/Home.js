import React,{useState,useEffect,useContext} from 'react'
import {Link} from 'react-router-dom'
import Loader from "react-loader-spinner"

const Home = ()=>{
	const [data,setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [grafoNombre,setGrafoNombre] = useState("")

	useEffect(()=>{
		fetch("http://127.0.0.1:8000/graph",{
				headers:{}
			}).then(res=>res.json())
			.then(result=>{
				setData(result)
				setLoading(false)
			})
	},[])

	const createGraph = () => {    
	    setLoading(true);
	    console.log(grafoNombre)
	    fetch("http://127.0.0.1:8000/graph", {
	      method: "POST",
	      headers: {
	        "Content-Type": "application/json",
	      },
	      body: JSON.stringify({
	        grafoName: grafoNombre,
	      }),
	    })
	      .then((res) => res.json())
	      .then((result) => {
	      	console.log(result)
	        setData(result);
	        setLoading(false);
	      })
	      .catch((err) => {
	        console.log(err);
	      });
  };

	return(
		<div className="home">
			<div className="row">
				<div className="col-md-8">
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
					            <button className="btn btn-primary" onClick={() => createGraph()}>
					              Crear Grafo
					            </button>
          					</div>
        				</div>
        			</div>


					{
						loading?<Loader
							className="centrar"
		       				type="TailSpin"
		        			color="#00BFFF"
		        			height={100}
		        			width={100}
		      			/>:


						data.map(item=>{
							return(
								
								<div className="gallery">
									{
										data.map(item=>{
											return(
												<div className="card" style={{maxWidth:"250px"}}>
  													<img className="card-img-top" src="https://revistadigital.inesem.es/informatica-y-tics/files/2017/03/Sin-t%C3%ADtulo-1.png" alt={item.grafoName} key={item.grafoId} />
  														<div className="card-body">
    														<h5 className="card-title">{item.grafoId}</h5>
    														<p className="card-text">{item.grafoName}</p>
    												    	<Link to={"/grafo/"+item.grafoId} className="btn btn-primary">Go somewhere</Link>
												    	</div>
												</div>		
											)
										})
									}
								</div>
						)}
					)}
				</div>			
		</div>
	</div>
	)
}

export default Home;