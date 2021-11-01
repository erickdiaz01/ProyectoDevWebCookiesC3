import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import CreateUser from "../Pages/CreateUser/CreateUser";
import ModuloAdminVentas from "../Pages/ModuloAdminVentas/ModuloAdminVentas";
import GestionPedidos from "../Pages/GestionPedidos/GestionPedidos";
import CreateProduct from "../Pages/CreateProduct/CreateProduct";
import ModificarProducto from "../Pages/ModificarProducto/ModificarProducto";
import HistoricoPedidos from "../Pages/HistoricoPedidos/HistoricoPedidos";
import VerUsuarios from "../Pages/VerUsuarios/VerUsuarios";
import GestionUsuarios from "../Pages/GestionUsuarios/GestionUsuarios";
import Header from "../Commons/Header/Header";
import Footer from "../Commons/Footer/Footer";
import Navegacion from "../Commons/Navegacion/Navegacion";
import EditProduct from "../Pages/EditarProduct/EditarProduct";

export const ContentRouter = () => {
  return (
    <>
      <Header />
      <Navegacion />

      <Switch>
        <Route exact path="/" component={CreateUser} />
        <Route path="/auth/crearusuario" component={CreateUser} />
        <Route path="/ventas/crearventa" component={ModuloAdminVentas} />
        <Route path="/ventas/gestionpedidos" component={GestionPedidos} />
        <Route path="/productos/crearproducto" component={CreateProduct} />
        <Route path="/productos/verproductos" component={ModificarProducto} />
        <Route path="/ventas/historicopedidos" component={HistoricoPedidos} />
        <Route path="/auth/verusuarios" component={VerUsuarios} />
        <Route path="/auth/gestionusuarios" component={GestionUsuarios} />
        <Route path="/productos/editar/:id" component={EditProduct} />

        <Redirect to="/productos/verproductos" />
      </Switch>
      <Footer />
    </>
  );
};
