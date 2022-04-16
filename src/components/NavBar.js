import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
//import {UserContext} from '../App'

const NavBar = ()=>{
  const history = useHistory()

	return(
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  			<Link className="navbar-brand" to="/home">
          <img className="icon" src="http://www.ucaldas.edu.co/docs/Web%20Relaciones%20Internacionales/images/logo.gif" />
        </Link>
  			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    			<span className="navbar-toggler-icon"></span>
  			</button>
  			<div className="collapse navbar-collapse" id="navbarText">
    			<ul className="navbar-nav mr-auto">
      				<li className="nav-item active">
        				<Link className="nav-link" to="/home">Home</Link>
      				</li> 
              



    			</ul>
    			<span className="navbar-text">
      				
    			</span>
  			</div>
		</nav>
	)
}

export default NavBar;