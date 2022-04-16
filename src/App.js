import React, {useEffect,createContext,useReducer,useContext,Suspense,lazy} from "react";
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Loader from "react-loader-spinner";

//import data from "./data/data.json";
//import { ForceGraph } from "./components/forceGraph";
import "./App.css";
import Control from "./components/control";
import NavBar from "./components/NavBar";
import Home from "./components/Home";


export const UserContext = createContext()

const Routing = ()=>{
  return(
    <Suspense fallback={<Loader
      className="centrar"
          type="Bars"
          color="#00BFFF"
          height={100}
          width={100}
        />
    }>
      <Switch>

      	<Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/home">
          <Home />
        </Route>

        <Route path="/grafo/:grafoid">
          <Control />
        </Route>
       </Switch>
    </Suspense>
     
  )
}

function App() {
  return (
    <BrowserRouter>
    	<NavBar />
        <Routing /> 
    </BrowserRouter>
  );
}

export default App;