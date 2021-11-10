import React from "react";
//Importacion de componentes

import Logo from "../../assets/img/logorestaurante.png";

//Importación de estilo
import "./Header.css";

const Header = () => {
  return (
    <div className="headerContainer">
      <div className="fixed top">
        <nav className="navbar navbar-dark bg-dark ">
          <div className="container-fluid">
            <a className="navbar-brand" href="/ventas/crearventa">
              <img src={Logo} alt="Logo" className="logo-restaurante" />
              <h1 className="titulo-navbar">Joselito</h1>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
