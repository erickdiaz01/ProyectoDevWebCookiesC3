import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./Pages/Login/Login";
import CreateUser from "./Pages/CreateUser/CreateUser";
import ModuloAdminVentas from "./Pages/ModuloAdminVentas/ModuloAdminVentas";
import GestionPedidos from "./Pages/GestionPedidos/GestionPedidos";
import CreateProduct from "./Pages/CreateProduct/CreateProduct";
import ModificarProducto from "./Pages/ModificarProducto/ModificarProducto";
import HistoricoPedidos from "./Pages/HistoricoPedidos/HistoricoPedidos";
import VerUsuarios from "./Pages/VerUsuarios/VerUsuarios";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={CreateUser} />
        <Route path="/registeruser" component={CreateUser} />
        <Route path="/login" component={Login} />
        <Route path="/gestionventas" component={ModuloAdminVentas}/>
        <Route path="/gestionpedidos" component={GestionPedidos}/>
        <Route path="/crearproducto" component={CreateProduct}/>
        <Route path="/modificarproducto" component={ModificarProducto}/>
        <Route path="/historico-pedidos" component={HistoricoPedidos}/>
        <Route path="/verusuarios" component={VerUsuarios}/>


      </Switch>
    </BrowserRouter>
  );
};

export default Router;
