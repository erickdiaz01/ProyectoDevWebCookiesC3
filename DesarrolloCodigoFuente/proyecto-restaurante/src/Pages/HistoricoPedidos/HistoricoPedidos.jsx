import React from "react";

import Label from "../Login/components/Label/Label";
import { Table } from "react-bootstrap";
import Input from "../CreateUser/components/Input/Input";

import Title from "../CreateUser/components/Title/Title";
import "./historicopedidos.css";

const HistoricoPedidos = () => {
  return (
    <div className="gestion-pedidos-container">
      <div className="gestion-pedidos-content">
        <header className="title-container">
          <Title text="Historico de pedidos" />
        </header>
        <section className="row">
          <div className="col-md-4">
            <Label text="ID de pedido" />
            <Input
              attribute={{
                id: "busquedaIdPedidoHistorico",
                name: "busquedaIdPedidoHistorico",
                type: "search",
                placeholder: "Busque por ID del pedido",
              }}
              //    handleChange={handleChange}
              // param={fechaRolIngresoHistoricoInvalid}
            />
          </div>
          <div className="col-md-4">
            <Label text="Num. Documento del cliente" />
            <Input
              attribute={{
                id: "busquedaDocumentoCliente",
                name: "busquedaDocumentoCliente",
                type: "search",
                placeholder: "Busque por # de documento del cliente",
              }}
              //    handleChange={handleChange}
              // param={fechaRolIngresoHistoricoInvalid}
            />
          </div>
          <div className="col-md-3">
            <Label text="Nombre del cliente" />
            <Input
              attribute={{
                id: "busquedaNombreCliente",
                name: "busquedaNombreCliente",
                type: "search",
                placeholder: "Busque por nombre del cliente",
              }}
              // handleChange={handleChange}
              // param={fechaRolIngresoHistoricoInvalid}
            />
          </div>
          <div className="col-md-1">
            <div className="search-button-container">
              <button
                //   onClick={handleSubmit}
                className="search-button"
              >
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
        </section>
        <section className="row">
          <Table striped bordered hover responsive className="tabla">
            <thead>
              <tr>
                <th>#ID Pedido</th>
                <th>Fecha del pedido</th>
                <th>Cliente</th>
                <th>Descripcion del pedido</th>
                <th>Valor del pedido</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>535</td>
                <td>07/10/2021</td>

                <td>Erick Diaz</td>
                <td>
                  Arroz amarillo con verduras y pollo, Mondongo con arroz aparte{" "}
                </td>
                <td>31.000</td>
                <td>
                  <a href="#">
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>534</td>
                <td>06/10/2021</td>
                
                <td>Carlos Rodriguez</td>
                <td>Pollo, Gaseosa 1.5L, Carne asada</td>
                <td>39.000</td>
                <td>
                  <a href="#">
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>533</td>
                <td>06/10/2021</td>
                
                <td>Nicol Quiñonez</td>
                <td>
                  Pechuga a la plancha x2, Carne asada, Ajiaco x3, Jarra
                  limonada{" "}
                </td>
                <td>52.000</td>
                <td>
                  <a href="#">
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>532</td>
                <td>05/10/2021</td>
                
                <td>Alvaro Rueda</td>
                <td>
                   Salchipas especial
                </td>
                <td>10.000</td>
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

export default HistoricoPedidos;
