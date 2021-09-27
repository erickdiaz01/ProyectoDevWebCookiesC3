import React from "react";
//Importacion de componentes
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";


//Importación de estilo
import "./Header.css";

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home"><Image src="src\assets\img\logorestaurante.png" alt="Logo" className="logo-restaurante" rounded />Restaurante</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <NavDropdown title="Menú" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Mi Perfil</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Carrito de compras
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Mis Pedidos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Sobre Nosotros
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
