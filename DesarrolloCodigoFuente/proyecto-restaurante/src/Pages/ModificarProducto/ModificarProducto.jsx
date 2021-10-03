import React from "react";

import Title from "../Login/components/Title/Title";
import Label from "../Login/components/Label/Label";
import Input from "../Login/components/Input/Input";

import "./ModificarProducto.css";
import { Table } from "react-bootstrap";

function ModificarProducto() {
  return (
    <div className="modificarProducto-container">
        
      <div className="modificarProducto-content">
        <header className="title-container">
          <Title text="Modifique el producto" />
        </header>
        <section className="row">
          <div className="col-md-4">
            <Label text="ID Producto" />

            <Input
              attribute={{
                id: "busquedaIdProducto",
                name: "busquedaIdProducto",
                type: "search",
                placeholder: "Busque por ID del producto",
              }}
              //    handleChange={handleChange}
              // param={fechaRolIngresoHistoricoInvalid}
            />
          </div>
          <div className="col-md-4">
            <Label text="Categoria" />
            <div className="input-container">
              <select
                id="busquedaCategoria"
                name="busquedaCategoria"
                //   onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="regular-style"
              >
                <option value="fritos">Fritos</option>
                <option value="comidaRapida">Comida Rapida</option>
                <option value="carnesparrilla">Carnes a la parrilla</option>
                <option value="polloAsadero">Pollo Asadero</option>
                <option value="sopas">Sopas</option>
                <option value="bebidas">Bebidas</option>
                <option value="adicionales">Adicionales</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <Label text="Nombre del producto" />
            <Input
              attribute={{
                id: "busquedaNombreProducto",
                name: "busquedaNombreProducto",
                type: "search",
                placeholder: "Busque por nombre de producto",
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
                <th>#ID Producto</th>
                <th>Categoria</th>
                <th>Nombre del producto</th>
                <th>Descripcion del producto</th>
                <th>Valor unitario del producto</th>
                <th>Stock</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Fritos</td>
                <td>Empanada de pollo</td>
                <td>Empanada rellena de pollo</td>
                <td>1.500</td>
                <td>-</td>
                <td>
                  <a href="#">
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
                <td>
                  <a href="#">
                    <i className="bi bi-trash-fill"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>15</td>
                <td>Comida rapida</td>
                <td>Salchipapas</td>
                <td>Rapipapa con salchicha zenú</td>
                <td>3.000</td>
                <td>-</td>
                <td>
                  <a href="#">
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
                <td>
                  <a href="#">
                    <i className="bi bi-trash-fill"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>27</td>
                <td>Bebidas</td>
                <td>Gaseosa 1.5L</td>
                <td>Gaseosa Manzana Postobon</td>
                <td>4.000</td>
                <td>12</td>
                <td>
                  <a href="#">
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
                <td>
                  <a href="#">
                    <i className="bi bi-trash-fill"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>32</td>
                <td>Carnes a la parrilla</td>
                <td>Pechuga a la plancha</td>
                <td>Pechuga con vegetales, papas a la francesa y ensalada</td>
                <td>14.000</td>
                <td>-</td>
                <td>
                  <a href="#">
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
                <td>
                  <a href="#">
                    <i className="bi bi-trash-fill"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </Table>
        </section>
      </div>
    </div>
  );
}

export default ModificarProducto;
