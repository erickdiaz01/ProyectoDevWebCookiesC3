import React from "react";

import "./Navegacion.css";

import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

function Navegacion() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Producto
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="/crearproducto">
                    Crear producto
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/modificarproducto">
                    Modificar producto
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Venta
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="/gestionventas">
                    Crear venta
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/gestionpedidos">
                    Gestionar pedidos
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Historico de pedidos
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Clientes
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Ver clientes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Estadisticas clientes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Preguntas y comentarios
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Usuarios
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="/registeruser">
                    Crear usuario
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Ver usuarios
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Gestionar usuarios
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <a className="navbar-brand" href="#">
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-dark me-md-2" type="button">
              Generar reportes
            </button>
            <button class="btn btn-dark" type="button">
              Registrar Pago
            </button>
          </div>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDarkDropdown"
          aria-controls="navbarNavDarkDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navegacion;
