import React from "react";
import data from "./data/data.json";
import { ForceGraph } from "./components/forceGraph";
import "./App.css";
import Control from "./components/control";

function App() {
  return (
    <div className="App">
      <header className="App-header">Force Graph Example</header>
      <Control />
    </div>
  );
}

export default App;
