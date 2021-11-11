import React, { useEffect, useState } from "react";

import notie from "notie";
import Swal from "sweetalert2";
import "notie/dist/notie.css";
import useAuth from "../../hooks/useAuth";
import { listarUsuarios, eliminarUsuario } from "../../services/Auth.service";

import { Link } from "react-router-dom";

import Label from "../Login/components/Label/Label";
import { Table } from "react-bootstrap";
import Input from "../Login/components/Input/Input";

import "./VerUsuarios.css";
import Title from "../CreateUser/components/Title/Title";
const VerUsuarios = () => {
  const auth = useAuth();

  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [busquedaIdUsuario, setBusquedaIdUsuario] = useState("");
  const [busquedaRol, setBusquedaRol] = useState("");
  const [busquedaNombre, setBusquedaNombre] = useState("");

  const getUsuarios = async () => {
    try {
      const { data } = await listarUsuarios(auth.token);

      console.log(data);
      setUsuarios(data);
      setTablaUsuarios(data);
      console.log(usuarios);
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
  function conversionRol(value) {
    if (value === "6175ca2afe66858d6c5671e1") {
      let rol = "Administrador";
      return rol;
    } else if (value === "61763b69b176073c2a7202cd") {
      let rol = "Vendedor";
      return rol;
    } else if (value === "6187440898f2d08c80ae537f") {
      let rol = "Cajero";
      return rol;
    } else if (value === "618743f598f2d08c80ae537e") {
      let rol = "Mesero";
      return rol;
    } else if (value === "6187441a98f2d08c80ae5380") {
      let rol = "Domiciliario";
      return rol;
    } else {
      let rol = "Indefinido";
      return rol;
    }
  }

  const handleDelete = async (usuario) => {
    console.log("usuario", usuario);

    await Swal.fire({
      title: "Eliminar Usuario",
      text: "¿Esta seguro que desea eliminar el Usuario?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      console.log(result);
      if (result.isConfirmed) {
        let listaUsuarios = usuarios;
        listaUsuarios.map(async (usuarioLista) => {
          if (usuario._id === usuarioLista._id) {
            const { data } = await eliminarUsuario(auth.token, usuario._id);
            if (data) {
              getUsuarios();
            }
          }
        });
      }

      Swal.fire("¡Hecho!", "El usuario ha sido eliminado", "success");
      return true
    });
  };
  const filtrar = (terminoBusqueda) => {
    let resultadosBusqueda = tablaUsuarios.filter((elemento) => {
      let rolUser = elemento.rol._id;

      if (elemento._id.toString().includes(terminoBusqueda)) {
        return elemento;
      } else if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      } else if (rolUser.toString().includes(terminoBusqueda)) {
        return elemento;
      }
    });
    setUsuarios(resultadosBusqueda);
  };

  function handleChange(name, value) {
    if (name === "busquedaIdUsuario") {
      setBusquedaIdUsuario(value);
      filtrar(value);
      console.log(value);
    } else if (name === "busquedaRol") {
      setBusquedaRol(value);
      filtrar(value);
      console.log(value);
    } else if (name === "busquedaUsuario") {
      setBusquedaNombre(value);
      filtrar(value);
      console.log(value);
    }
  }

  useEffect(() => {
    getUsuarios();
  }, []);

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
              value={busquedaIdUsuario}
              handleChange={handleChange}
              // param={fechaRolIngresoHistoricoInvalid}
            />
          </div>
          <div className="col-md-4">
            <Label text="Rol" />
            <div className="input-container">
              <select
                id="busquedaRol"
                name="busquedaRol"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={busquedaRol}
                className="regular-style"
              >
                <option value=""></option>
                <option value="61763b69b176073c2a7202cd">Vendedor</option>
                <option value="6175ca2afe66858d6c5671e1">Administrador</option>
                <option value="6187440898f2d08c80ae537f">Cajero</option>
                <option value="618743f598f2d08c80ae537e">Mesero</option>
                <option value="6187441a98f2d08c80ae5380">Domiciliario</option>
                <option value="61759f0c42205b65b5e04409">Indefinido</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <Label text="Usuario" />
            <Input
              attribute={{
                id: "busquedaUsuario",
                name: "busquedaUsuario",
                type: "search",
                placeholder: "Busque por nombre de Usuario",
              }}
              handleChange={handleChange}
              value={busquedaNombre}
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
                <th>#ID Usuario</th>
                <th>Nombre del usuario</th>
                <th>Rol </th>
                <th>Fecha creacion</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {handleDelete&&usuarios?.map((usuarios, index) => (
                <tr key={usuarios._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{usuarios.name}</td>
                  <td>{conversionRol(usuarios.rol._id)}</td>
                  <td>{usuarios.createdAt}</td>
                  <td>
                    <Link
                      className="btn btn-primary mr-3"
                      to={`/auth/editarusuario/${usuarios._id}`}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn btn-danger mr-3"
                      data="data de pruebas"
                      onClick={() => handleDelete(usuarios)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      </div>
    </div>
  );
};

export default VerUsuarios;
