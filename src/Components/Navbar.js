import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import 'bootstrap/dist/css/bootstrapcgr.css';// **** 
import {
    //BrowserRouter as Router,
    Link
  } from "react-router-dom";

const NavBar = () => {
    return(
        <div className="App">
    <ReactBootStrap.Navbar collapseOnSelect expand="xl" bg="warning" variant="info">

  <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
  <ReactBootStrap.Nav className="mr-auto"> 
  <Link to="/Home">
    <ReactBootStrap.Nav.Link href="#Home">Inicio</ReactBootStrap.Nav.Link>
    </Link>
    <Link to="/CRUD">
    <ReactBootStrap.Nav.Link href="#CRUD">CRUD</ReactBootStrap.Nav.Link>
    </Link>
    <Link to="/DatosGlobales">
    <ReactBootStrap.Nav.Link href="#DatosGlobales">Datos Globales</ReactBootStrap.Nav.Link>
    </Link>
      <ReactBootStrap.NavDropdown title="opciones" id="collasible-nav-dropdown">
        <ReactBootStrap.NavDropdown.Item href="#action/3.1">Opcion 1</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item href="#action/3.2">Opcion 2</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Item href="#action/3.3">Opcion 3</ReactBootStrap.NavDropdown.Item>
        <ReactBootStrap.NavDropdown.Divider />
        <ReactBootStrap.NavDropdown.Item href="#action/3.4">Opcion 4</ReactBootStrap.NavDropdown.Item>
      </ReactBootStrap.NavDropdown>
    </ReactBootStrap.Nav>
    <ReactBootStrap.Nav>
    <Link to="/deets">
    <ReactBootStrap.Nav.Link href="#deets">More deets</ReactBootStrap.Nav.Link>
    </Link>
    <Link to="/dankmemes">
    <ReactBootStrap.Nav.Link eventKey={2} href="#memes">
        Dank memes
      </ReactBootStrap.Nav.Link>
    </Link>
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
        </div>
    )
}

export default NavBar;