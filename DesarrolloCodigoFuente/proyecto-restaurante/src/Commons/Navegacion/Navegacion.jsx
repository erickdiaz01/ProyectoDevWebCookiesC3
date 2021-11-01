import React from "react";
import useAuth from '../../hooks/useAuth'
import "./Navegacion.css";

import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

function Navegacion() {
  const auth = useAuth();

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
                  <a className="dropdown-item" href="/productos/crearproducto">
                    Crear producto
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/productos/verproductos">
                    Ver productos
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
                Ventas
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="/ventas/crearventa">
                    Crear venta
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/ventas/gestionpedidos">
                    Gestionar pedidos
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/ventas/historicopedidos">
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
                  <a className="dropdown-item" href="/auth/crearusuario">
                    Crear usuario
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/auth/verusuarios">
                    Ver usuarios
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/auth/gestionusuarios">
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
            <button className="btn btn-outline-danger" onClick={auth.logout}>
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
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
