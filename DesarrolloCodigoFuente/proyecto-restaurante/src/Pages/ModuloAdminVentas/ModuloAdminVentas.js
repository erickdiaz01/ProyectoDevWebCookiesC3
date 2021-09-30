import React, { useState } from "react";
import Input from "../Login/components/Input/Input";
import Label from "../Login/components/Label/Label";
import Title from "../Login/components/Title/Title";

import "./ModuloAdminVentas.css";

const ModuloAdminVentas = () => {
  const [idVenta, setIdVenta] = useState("");
  const [idProducto, setIdProducto] = useState("");
  const [valorTotalVenta, setValorTotalVenta] = useState("");
  const [fechaVenta, setFechaVenta] = useState("");
  const [fechaPago, setFechaPago] = useState("");
  const [descripcion, setDescripcion] = useState("");

  function handleChange(name, value) {
    if (name === "idVenta") {
      setIdVenta(value);
    } else if (name === "valorTotalVenta") {
      setValorTotalVenta(value);
    } else if (name === "fechaVenta") {
      setFechaVenta(value);
    } else if (name === "fechaPago") {
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
      fechaPago,
      descripcion,
    };
    if (account) {
    }
  }
  return (
    <div className="moduloAdminVentas-container">
      <div className="moduloAdminVentas-content">
        <header className="title-container">
          <Title text="Gestion de ventas" />
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
                onChange={(e) => handleChange(e.target.name, e.target.value)}
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
              <Label text="Fecha de pago" />
              <Input
                attribute={{
                  id: "fechaPago",
                  name: "fechaPago",
                  type: "date",
                  placeholder: "Ingrese la fecha de pago",
                }}
                handleChange={handleChange}
                // param={}
                required
              />
            </div>
          </section>
          <section className="row">
            <Label text="Descripción de la venta" />
            <textarea rows="10" cols="12" className="regular-style" placeholder="Ingrese la descripción de la venta"></textarea>
          </section>
        </article>
      </div>
    </div>
  );
};

export default ModuloAdminVentas;
