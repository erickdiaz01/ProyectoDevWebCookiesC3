import React, { useState } from "react";
import Navegacion from "../../Commons/Navegacion/Navegacion";
import Input from "../Login/components/Input/Input";
import Label from "../Login/components/Label/Label";
import Title from "../Login/components/Title/Title";
import Table from "react-bootstrap/Table";

import "./ModuloAdminVentas.css";

const ModuloAdminVentas = () => {
  const [idVenta, setIdVenta] = useState("");
  const [idProducto, setIdProducto] = useState("");
  const [valorTotalVenta, setValorTotalVenta] = useState("");
  const [fechaVenta, setFechaVenta] = useState("");
  const [modoPago, setFechaPago] = useState("");
  const [descripcion, setDescripcion] = useState("");

  function handleChange(name, value) {
    if (name === "idVenta") {
      setIdVenta(value);
    } else if (name === "valorTotalVenta") {
      setValorTotalVenta(value);
    } else if (name === "fechaVenta") {
      setFechaVenta(value);
    } else if (name === "modoPago") {
      setFechaPago(value);
    } else if (name === "descripcion") {
      setDescripcion(value);
    } else {
      setIdProducto(value);
    }
  }
  function handleSubmit() {
    let account = {
      idVenta,
      idProducto,
      valorTotalVenta,
      fechaVenta,
      modoPago,
      descripcion,
    };
    if (account) {
    }
  }
  return (
    <div className="moduloAdminVentas-container">
      <div className="moduloAdminVentas-content">
        <Title text="Gestion de ventas" />
        <div className="row">
          <div className="col-md-6">
            <header className="title-container">
              <br />
              <h3>Ingrese información de la venta del producto</h3>
            </header>
            <article className="container">
              <section className="row">
                <Label text="ID de factura" />
                <Input
                  attribute={{
                    id: "idFactura",
                    name: "idFactura",
                    type: "text",
                    placeholder: "Id de factura",
                  }}
                  handleChange={handleChange}

                  // param={}
                />
              </section>
              <section className="row">
                <Label text="ID de producto" />
                <Input
                  attribute={{
                    id: "idProducto",
                    name: "idProducto",
                    type: "text",
                    placeholder: "Ingrese el Id del producto",
                  }}
                  handleChange={handleChange}
                  // param={}
                />
              </section>
              <section className="row">
                <div className="col-md-6">
                  <Label text="Cantidad" />
                  <select
                    required
                    id="cantidadProducto"
                    name="cantidadProducto"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    className="regular-style"
                  >
                    <option value="uno">1</option>
                    <option value="dos">2</option>
                    <option value="tres">3</option>
                    <option value="cuatro">4</option>
                    <option value="cinco">5</option>
                    <option value="seis">6</option>
                    <option value="siete">7</option>
                  </select>
                </div>
                <br />
                <div className="col-md-6">
                  <Label text="Valor total venta" />
                  <Input
                    attribute={{
                      id: "valorTotalVenta",
                      name: "valorTotalVenta",
                      type: "float",
                      placeholder: "Ingrese el valor total ",
                    }}
                    handleChange={handleChange}
                    // param={}
                    required
                  />
                </div>
              </section>
              <section className="row">
                <div className="col-md-6">
                  <Label text="Fecha de venta" />
                  <Input
                    attribute={{
                      id: "fechaVenta",
                      name: "fechaVenta",
                      type: "date",
                      placeholder: "Ingrese la fecha de la venta",
                    }}
                    handleChange={handleChange}
                    // param={}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <Label text="Metodo de pago" />
                  <select
                    required
                    id="modoPago"
                    name="modoPago"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    className="regular-style"
                  >
                    <option value="tcredito">Tarjeta de Credito</option>
                    <option value="tdebito">Tarjeta de Debito</option>
                    <option value="pse">PSE</option>
                    <option value="efectivo">Efectivo contraentrega</option>
                  </select>
                </div>
              </section>
              <section className="row">
                <Label text="Comentarios o peticiones del producto" />
                <textarea
                  rows="10"
                  cols="12"
                  className="regular-style"
                  placeholder="Ingrese alguna peticion especial sobre el producto"
                ></textarea>
              </section>
              <div className="submit-button-container">
                <button onClick={handleSubmit} className="submit-button">
                  AGREGAR PRODUCTO
                </button>
              </div>
            </article>
          </div>
          <div className="col-md-6">
            <header className="title-container">
              <br />
              <h3>Información del pedido</h3>
            </header>
            <Table striped bordered hover responsive className="tabla">
              <thead>
                <tr>
                  <th>#ID Producto</th>
                  <th>Nombre producto</th>
                  <th>Descripción producto</th>
                  <th>Cantidad producto</th>
                  <th>Valor total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Arroz con pollo</td>
                  <td>Arroz amarillo con verduras y pollo</td>
                  <td>2</td>
                  <td>26.000</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Mondongo</td>
                  <td>Sopa de mongdongo y arroz aparte</td>
                  <td>1</td>
                  <td>5.000</td>
                </tr>
                <tr>
                  <td colSpan="4" style={{ fontWeight: "bolder" }}>
                    Total factura
                  </td>
                  <td>31.000</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuloAdminVentas;
