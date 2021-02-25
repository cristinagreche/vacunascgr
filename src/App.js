import React from 'react';
import './App.css';
/*import * as ReactBootStrap from "react-bootstrap"; cgr:esto dice npm que no se usa*/
import DankMemes from "./Components/DankMemes";
import CRUD from "./Components/CRUD";
import Home from "./Components/Home";
import DatosGlobales from "./Components/DatosGlobales";
import MoreDeets from "./Components/MoreDeets";
import NavBar from "./Components/Navbar"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //redirect, esto es lo de que
  //Link cgr: esto tampoco se usa según npm
} from "react-router-dom";


function App() {
  return (
    <div className="App">
        <Router>
        <NavBar />
 

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/Home" component={Home}>
              <Home />
          </Route>
          <Route path="/CRUD" component={CRUD}>
              <CRUD />
          </Route>
          <Route path="/DatosGlobales" component={DatosGlobales}>
            <DatosGlobales />
          </Route>
          <Route path="/deets" component={MoreDeets}>
            <MoreDeets />
          </Route>
          <Route path="/dankmemes" component={DankMemes}>
            <DankMemes />
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
