import React, { useEffect, useState } from "react";
import Title from "../Login/components/Title/Title";
import Label from "../Login/components/Label/Label";
import Input from "../Login/components/Input/Input";
import { Link } from "react-router-dom";

import notie from "notie";
import Swal from "sweetalert2";
import "notie/dist/notie.css";
import useAuth from "../../hooks/useAuth";
import {
  listarProductos,
  eliminarProducto,
} from "../../services/Productos.service";
import "./ModificarProducto.css";
import { Table } from "react-bootstrap";

const ModificarProducto = () => {
  const auth = useAuth();

  const [producto, setProductos] = useState([]);
  const [tablaProductos, setTablaProductos] = useState([]);
  const [busquedaId, setBusquedaId] = useState("");
  const [busquedaCategoria, setBusquedaCategoria] = useState("");
  const [busquedaNombre, setBusquedaNombre] = useState("");

  const getProductos = async () => {
    try {
      const { data } = await listarProductos(auth.token);
      console.log(data);
      setProductos(data.productos);
      setTablaProductos(data.productos);
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

  const handleDelete = async (productoEliminar) => {
    console.log("producto", productoEliminar);

    await Swal.fire({
      title: "Eliminar Producto",
      text: "¿Esta seguro que desea eliminar el producto?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      console.log(result);
      if (result.isConfirmed) {
        let listaProductos = producto;
        listaProductos.map(async (productoLista) => {
          if (productoEliminar._id === productoLista._id) {
            const { data } = await eliminarProducto(auth.token, productoEliminar._id);
            if (data) {
              getProductos();
            }
          }
        });
        Swal.fire("¡Hecho!", "El producto ha sido eliminado", "success");
        return true
      }
    });
  };
  function handleChange(name, value) {
    if (name === "busquedaIdProducto") {
      setBusquedaId(value);
      filtrar(value);
      console.log(value);
    } else if (name === "busquedaCategoria") {
      setBusquedaCategoria(value);
      filtrar(value);
      console.log(value);
    } else if (name === "busquedaNombreProducto") {
      setBusquedaNombre(value);
      filtrar(value);
      console.log(value);
    }
  }
  const filtrar = (terminoBusqueda) => {
    let resultadosBusqueda = tablaProductos.filter((elemento) => {
      let categoria = elemento.categoria.name;
      if (elemento._id.toString().includes(terminoBusqueda)) {
        return elemento;
      } else if (
        elemento.nombre
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      } else if (categoria.toString().includes(terminoBusqueda)) {
        return elemento;
      }
    });
    setProductos(resultadosBusqueda);
  };
  useEffect(() => {
    getProductos();
  }, []);

  return (
    <div className="modificarProducto-container">
      <div className="modificarProducto-content">
        <header className="title-container">
          <Title text="Productos" />
        </header>
        <section className="row">
          <div className="col-md-4">
            <Label text="ID Producto" />

            <Input
              attribute={{
                id: "busquedaIdProducto",
                name: "busquedaIdProducto",
                type: "search",
                placeholder: "Busque por ID del productos",
              }}
              value={busquedaId}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <Label text="Categoria" />
            <div className="input-container">
              <select
                id="busquedaCategoria"
                name="busquedaCategoria"
                className="regular-style"
                value={busquedaCategoria}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                <option value=""></option>
                <option value="Fritos">Fritos</option>
                <option value="Comida rapida">Comida rapida</option>
                <option value="Carnes a la parrilla">
                  Carnes a la parrilla
                </option>
                <option value="Pollo Asadero">Pollo Asadero</option>
                <option value="Sopas">Sopas</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Adicionales">Adicionales</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <Label text="Nombre del productos" />
            <Input
              attribute={{
                id: "busquedaNombreProducto",
                name: "busquedaNombreProducto",
                type: "search",
                placeholder: "Busque por nombre de productos",
              }}
              handleChange={handleChange}
              value={busquedaNombre}
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
              {handleDelete&&producto?.map((producto) => (
                <tr key={producto._id}>
                  <th scope="row">{producto._id}</th>
                  <td>{producto.categoria.name}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.costo}</td>
                  <td>{producto.cantidad}</td>
                  <td>
                    <Link
                      className="btn btn-primary mr-3"
                      to={`/productos/editar/${producto._id}`}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn btn-danger mr-3"
                      data="data de pruebas"
                      onClick={() => handleDelete(producto)}
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

export default ModificarProducto;
