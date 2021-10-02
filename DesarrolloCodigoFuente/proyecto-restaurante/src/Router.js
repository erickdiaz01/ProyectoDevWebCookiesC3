import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./Pages/Login/Login";
import CreateUser from "./Pages/CreateUser/CreateUser";
import ModuloAdminVentas from "./Pages/ModuloAdminVentas/ModuloAdminVentas";
import GestionPedidos from "./Pages/GestionPedidos/GestionPedidos";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={CreateUser} />
        <Route path="/registeruser" component={CreateUser} />
        <Route path="/login" component={Login} />
        <Route path="/gestionventas" component={ModuloAdminVentas}/>
        <Route path="/gestionpedidos" component={GestionPedidos}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
