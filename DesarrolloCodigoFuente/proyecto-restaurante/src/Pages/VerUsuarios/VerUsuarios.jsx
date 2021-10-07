import React from "react";

import Label from "../Login/components/Label/Label";
import { Table } from "react-bootstrap";
import Input from "../CreateUser/components/Input/Input";

import "./VerUsuarios.css";
import Title from "../CreateUser/components/Title/Title";
const VerUsuarios = () => {
  
  return (
    <div className="ver-usuarios-container">
      <div className="ver-usuarios-content">
        <header className="title-container">
          <Title text="Información de usuarios" />
        </header>
        <section className="row">
          <div className="col-md-4">
            <Label text="ID Usuario" />
            <Input
              attribute={{
                id: "busquedaIdUsuario",
                name: "busquedaIdUsuario",
                type: "search",
                placeholder: "Busque por ID del Usuario",
              }}
              //    handleChange={handleChange}
              // param={fechaRolIngresoHistoricoInvalid}
            />
          </div>
          <div className="col-md-4">
            <Label text="Rol" />
            <div className="input-container">
              <select
                id="busquedaEstado"
                name="busquedaEstado"
                //   onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="regular-style"
              >
                <option value="Activo">Vendedor</option>
                <option value="Inactivo">Administrador</option>
                <option value="Inactivo">Cajero</option>
                <option value="Inactivo">Mesero</option>
                <option value="Inactivo">Domiciliario</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <Label text="Usuario" />
            <Input
              attribute={{
                id: "busquedaUsuario",
                name: "busquedaUsuario",
                type: "search",
                placeholder: "Busque por nombre de Usuario",
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
                <th>#ID Usuario</th>
                <th>Rol del Usuario</th>
                <th>Descripcion del Usuario</th>
                <th>Nombre del Usuario</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Administrador</td>
                <td>
                  Usuario registrado en Enero de 2021{" "}
                </td>
                <td>Erick</td>
                <td>
                  <a href="#">
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Cajero</td>
                <td>Usuario registrado en Febrero de 2021 y removido en Junio del mismo año</td>
                <td>Edison</td>
                <td>
                  <a href="#">
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Mesero</td>
                <td>
                  Usuario registrado en Febrero de 2021{" "}
                </td>
                <td>Alejandra</td>
                <td>
                  <a href="#">
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Domiciliario</td>
                <td>
                 Usuario registrado en Marzo de 2021 y removido el mismo mes
                </td>
                <td>Javier</td>
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

export default VerUsuarios;
