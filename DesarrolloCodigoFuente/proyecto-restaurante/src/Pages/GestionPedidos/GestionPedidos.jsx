import React from "react";

import Label from "../Login/components/Label/Label";
import { Table } from "react-bootstrap";
import Input from "../CreateUser/components/Input/Input";

import "./GestionPedidos.css";
import Title from "../CreateUser/components/Title/Title";
const GestionPedidos = () => {
  return (
    <div className="gestion-pedidos-container">
      <div className="gestion-pedidos-content">
        <header className="title-container">
          <Title text="Información de los pedidos" />
        </header>
        <section className="row">
          <div className="col-md-4">
            <Label text="ID Pedido" />
            <Input
              attribute={{
                id: "busquedaIdPedido",
                name: "busquedaIdPedido",
                type: "search",
                placeholder: "Busque por ID del pedido",
              }}
              //    handleChange={handleChange}
              // param={fechaRolIngresoHistoricoInvalid}
            />
          </div>
          <div className="col-md-4">
            <Label text="Estado" />
            <div className="input-container">
              <select
                id="busquedaEstado"
                name="busquedaEstado"
                //   onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="regular-style"
              >
                <option value="porDespachar">Por despachar</option>
                <option value="despachado">Despachado</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <Label text="Vendedor" />
            <Input
              attribute={{
                id: "busquedaVendedor",
                name: "busquedaVendedor",
                type: "search",
                placeholder: "Busque por vendedor",
              }}
              // handleChange={handleChange}
              // param={fechaRolIngresoHistoricoInvalid}
            />
          </div>
        </section>
        <section className="row">
          <Table striped bordered hover responsive className="tabla">
            <thead>
              <tr>
                <th>#ID Pedido</th>
                <th>Estado del pedido</th>
                <th>Descripcion del pedido</th>
                <th>Vendedor del pedido</th>
                <th>Valor del pedido</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>572</td>
                <td>Por despachar</td>
                <td>
                  Arroz amarillo con verduras y pollo, Mondongo con arroz aparte{" "}
                </td>
                <td>Erick</td>
                <td>31.000</td>
                <td>
                  <a href="#">
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>534</td>
                <td>Despachado</td>
                <td>Pollo, Gaseosa 1.5L, Carne asada</td>
                <td>Edison</td>
                <td>39.000</td>
                <td>
                  <a href="#">
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>533</td>
                <td>Despachado</td>
                <td>
                  Pechuga a la plancha x2, Carne asada, Ajiaco x3, Jarra
                  limonada{" "}
                </td>
                <td>Alejandra</td>
                <td>52.000</td>
                <td>
                  <a href="#">
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>532</td>
                <td>Despachado</td>
                <td>
                  Pechuga a la plancha x2, Carne asada, Ajiaco x3, Jarra
                  limonada
                </td>
                <td>Alejandra</td>
                <td>52.000</td>
                <td>
                  <a href="#">
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </Table>
        </section>
      </div>
    </div>
  );
};

export default GestionPedidos;
