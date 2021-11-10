import React, { useEffect, useState } from "react";
import Title from "../Login/components/Title/Title";
import Label from "../Login/components/Label/Label";
import Input from "../Login/components/Input/Input";


import notie from "notie";

import "notie/dist/notie.css";
import useAuth from "../../hooks/useAuth";
import {
  
  listarClientes,
} from "../../services/ModuloAdmin.service";
import "../ModificarProducto/ModificarProducto.css";
import { Table } from "react-bootstrap";

const VerClientes = () => {
  const auth = useAuth();

  const [clientes, setClientes] = useState([]);
  const [tablaClientes, setTablaClientes] = useState([]);
  const [busquedaIdentificacion, setBusquedaIdentificacion] = useState("");
  const [busquedaNombreCliente, setBusquedaNombreCliente] = useState("");
  

  const getClientes = async () => {
    try {
      const { data } = await listarClientes(auth.token);
      console.log(data);
      setClientes(data.clientes);
      setTablaClientes(data.clientes)
      console.log(data.clientes);
    } catch ({ response: error }) {
      console.log(error);
      if (error.status === 401) {
        setTimeout(() => {
          auth.logout();
        }, 3000);
        notie.alert({ text: error.data.msg, type: "warning", time: 3 });
      } else {
        notie.alert({ text: error.data.msg, type: "error", time: 3 });
      }
    }
  };

  // const handleDelete = (id) => {
  //   console.log("id", id);

  //   Swal.fire({
  //     title: "Eliminar Cliente",
  //     text: "¿Esta seguro que desea eliminar el cliente?",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Si, eliminar",
  //     cancelButtonText: "Cancelar",
  //   }).then(async (result) => {
  //     console.log(result);
  //     const { data } = await eliminarCliente(auth.token, id);
  //     setClientes(data.clientes);
  //     if (result.value) {
  //       Swal.fire("¡Hecho!", "El cliente ha sido eliminado", "success");
  //     }
  //   });
  // };
  function handleChange(name, value) {
    if (name === "busquedaIdentificacionCliente") {
      setBusquedaIdentificacion(value);
      filtrar(value);
      console.log(value);
    } else if (name === "busquedaNombreCliente") {
      setBusquedaNombreCliente(value);
      filtrar(value);
      console.log(value);
    }
  }
  const filtrar = (terminoBusqueda) => {
    let resultadosBusqueda = tablaClientes.filter((elemento) => {
      if (
        elemento.identificacion.toString().includes(terminoBusqueda.toString())
      ) {
        return elemento;
      } else if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setClientes(resultadosBusqueda);
  };
  useEffect(() => {
    getClientes();
  }, []);

  return (
    <div className="modificarProducto-container">
      <div className="modificarProducto-content">
        <header className="title-container">
          <Title text="Clientes" />
        </header>
        <br/>
        <section className="row">
          <div className="col-md-6">
          <Label text="Nombre" />
            <Input
              attribute={{
                id: "busquedaNombreCliente",
                name: "busquedaNombreCliente",
                type: "search",
                placeholder: "Busque por nombre del cliente",
              }}
              handleChange={handleChange}
              value={busquedaNombreCliente}
             
            />
          </div>

          <div className="col-md-5">
            <Label text="# Identificación" />

            <Input
              attribute={{
                id: "busquedaIdentificacionCliente",
                name: "busquedaIdentificacionCliente",
                type: "search",
                placeholder: "Busque por identifiación del cliente",
              }}
              value={busquedaIdentificacion}
              handleChange={handleChange}
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
                <th>#ID Cliente </th>
                <th>Nombre cliente</th>
                <th>Identificación Cliente</th>

                {/* <th>Eliminar</th> */}
              </tr>
            </thead>
            <tbody>
              {clientes?.map((cliente) => (
                <tr key={cliente._id}>
                  <th scope="row">{cliente._id}</th>
                  <td>{cliente.name}</td>
                  <td>{cliente.identificacion}</td>
                  {/* <td>
                    <button
                      type="button"
                      className="btn btn btn-danger mr-3"
                      data="data de pruebas"
                      onClick={() => handleDelete(cliente._id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      </div>
    </div>
  );
};

export default VerClientes;
