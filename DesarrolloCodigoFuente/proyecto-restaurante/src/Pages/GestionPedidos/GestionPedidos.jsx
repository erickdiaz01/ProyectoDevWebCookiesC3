import React, { useEffect, useState } from "react";

import Label from "../Login/components/Label/Label";
import { Table } from "react-bootstrap";
import Input from "../Login/components/Input/Input";
import { Link } from "react-router-dom";

import notie from "notie";
import Swal from "sweetalert2";
import "notie/dist/notie.css";
import useAuth from "../../hooks/useAuth";
import {
  eliminarPedido,
  listarClientes,
  listarPedidos,
} from "../../services/ModuloAdmin.service";
import "./GestionPedidos.css";
import Title from "../CreateUser/components/Title/Title";
import axios from "axios";

const GestionPedidos = () => {
  const auth = useAuth();

  const [clientes, setClientes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [tablaPedidos, setTablaPedidos] = useState([]);
  const [busquedaIdPedido, setBusquedaIdPedido] = useState("");
  const [busquedaFecha, setBusquedaFecha] = useState("");
  const [busquedaNombreCliente, setBusquedaNombreCliente] = useState("");

  const getPedidos = async () => {
    try {
      const { data } = await listarPedidos(auth.token);
      let pedidosSinEntregar = [];
      let pedidosSinEnt = data.pedidos.map((pedido) => {
        if (pedido.entregado === false) {
          pedidosSinEntregar.push(pedido);
        }
      });

      console.log(data);
      console.log(pedidosSinEntregar);
      setPedidos(pedidosSinEntregar);
      setTablaPedidos(pedidosSinEntregar);
      console.log(pedidos);
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
  const handleDelete = async (pedido) => {
    console.log("pedido", pedido);

    await Swal.fire({
      title: "Eliminar Pedido",
      text: "¿Esta seguro que desea eliminar el Pedido?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      console.log(result);
      if (result.isConfirmed) {
        let listaPedidos = pedidos;
        listaPedidos.map(async (pedidoLista) => {
          if (pedido._id === pedidoLista._id) {
            const { data } = await eliminarPedido(auth.token, pedido._id);
            if (data) {
              getPedidos();
            }
          }
        });
        Swal.fire("¡Hecho!", "El pedido ha sido eliminado", "success");
        return true;
      }
    });
  };
  function handleChange(name, value) {
    if (name === "busquedaIdPedido") {
      setBusquedaIdPedido(value);
      filtrar(value);
      console.log(value);
    } else if (name === "busquedaFecha") {
      setBusquedaFecha(value);
      filtrar(value);
      console.log(value);
    } else if (name === "busquedaCliente") {
      setBusquedaNombreCliente(value);
      filtrar(value);
      console.log(value);
    }
  }
  const filtrar = (terminoBusqueda) => {
    let resultadosBusqueda = tablaPedidos.filter((elemento) => {
      if (elemento._id.toString().includes(terminoBusqueda.toString())) {
        return elemento;
      } else if (
        elemento.cliente.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      } else if (
        elemento.fechaVenta.toString().includes(terminoBusqueda.toString())
      ) {
        return elemento;
      }
    });
    setPedidos(resultadosBusqueda);
  };
  async function handleEntregado(id) {
    try {
      let newEstado = {
        entregado: true,
      };
      Swal.fire({
        title: "¿Pedido Entregado?",
        text: "¿Esta seguro que desea cambiar el estado del Pedido?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Entregado",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        console.log(result);
        if (result.isConfirmed) {
          const { data, status } = await axios.put(
            `http://localhost:4000/api/ventas/verpedidos/editarventa/editarentregado/${id}`,
            newEstado
          );
          if (data) {
            if (status === 204) {
              notie.alert({ text: data.message, type: "success", time: 10 });
            } else if (status === 200) {
              notie.alert({ text: data.message, type: "success", time: 10 });
            }
            getPedidos();
            
          }
        }

        Swal.fire("¡Hecho!", "El pedido ha sido entregado", "success");
        return true;
      });

      console.log(newEstado);
    } catch (error) {
      console.log(error);
      console.log(error.toJSON());
      console.log(error.response.status);
      console.log(error.response.data);

      if (error.response.status === 401) {
        notie.alert({
          text: error.response.data.message,
          type: "warning",
          time: 10,
        });
      } else {
        notie.alert({
          text: error.response.data.message,
          type: "error",
          time: 10,
        });
      }
    }
  }

  function actualizar(id) {
    console.log(id);
  }
  useEffect(() => {
    getPedidos();
  }, []);

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
              handleChange={handleChange}
              value={busquedaIdPedido}
              // param={fechaRolIngresoHistoricoInvalid}
            />
          </div>
          <div className="col-md-4">
            <Label text="Fecha de pedido" />
            <div className="input-container">
              <Input
                attribute={{
                  id: "busquedaFecha",
                  name: "busquedaFecha",
                  type: "date",
                  placeholder: "Busque por fecha",
                }}
                handleChange={handleChange}
                value={busquedaFecha}
                // param={fechaRolIngresoHistoricoInvalid}
              />
            </div>
          </div>
          <div className="col-md-3">
            <Label text="Cliente" />
            <Input
              attribute={{
                id: "busquedaCliente",
                name: "busquedaCliente",
                type: "search",
                placeholder: "Busque por cliente",
              }}
              handleChange={handleChange}
              value={busquedaNombreCliente}
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
                <th>Productos</th>
                <th>Cliente</th>
                <th>Valor del pedido</th>
                <th>Editar</th>
                <th>Eliminar</th>
                <th>Entregado</th>
              </tr>
            </thead>
            <tbody>
              {(handleDelete || handleEntregado) &&
                pedidos?.map((pedido) => (
                  <tr key={pedido._id}>
                    <th scope="row">{pedido._id}</th>
                    <td>{pedido.fechaVenta}</td>
                    <td>
                      <ul>
                        {pedido.productos.map((producto) => (
                          <li>{`${producto.producto.nombre} x${producto.cantidad}`}</li>
                        ))}
                      </ul>
                    </td>
                    <td>{pedido.cliente.name}</td>
                    <td>{pedido.valorTotal}</td>

                    <td>
                      <Link
                        className="btn btn-primary mr-3"
                        to={`/ventas/pedidos/editar/${pedido._id}`}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn btn-danger mr-3"
                        data="data de pruebas"
                        onClick={() => handleDelete(pedido)}
                        onMouseOver={() => actualizar(pedido._id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleEntregado(pedido._id)}
                      >
                        Entregado
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

export default GestionPedidos;
