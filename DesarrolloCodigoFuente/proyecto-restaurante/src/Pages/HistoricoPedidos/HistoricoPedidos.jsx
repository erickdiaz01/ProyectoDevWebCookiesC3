import React, { useEffect, useState } from "react";

import Label from "../Login/components/Label/Label";
import { Table } from "react-bootstrap";
import Input from "../Login/components/Input/Input";
import { Link } from "react-router-dom";

import Title from "../CreateUser/components/Title/Title";
import "./historicopedidos.css";
import notie from "notie";
import Swal from "sweetalert2";
import "notie/dist/notie.css";
import useAuth from "../../hooks/useAuth";
import {
  eliminarPedido,
  listarClientes,
  listarPedidos,
} from "../../services/ModuloAdmin.service";

const HistoricoPedidos = () => {
  const auth = useAuth();

  const [clientes, setClientes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [tablaPedidos, setTablaPedidos] = useState([]);
  const [busquedaIdPedidoHistorico, setBusquedaIdPedidoHistorico] =
    useState("");
  const [busquedaFecha, setBusquedaFecha] = useState("");
  const [busquedaIdCliente, setBusquedaIdCliente] = useState("");

  const getPedidos = async () => {
    try {
      const { data } = await listarPedidos(auth.token);
      let pedidosEntregadosArreglo = [];
      let pedidosEntregados = data.pedidos.map((pedido) => {
        if (pedido.entregado === true) {
          pedidosEntregadosArreglo.push(pedido);
        }
      });

      console.log(data);
      console.log(pedidosEntregadosArreglo);
      setPedidos(pedidosEntregadosArreglo);
      setTablaPedidos(pedidosEntregadosArreglo);
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
    if (name === "busquedaIdPedidoHistorico") {
      setBusquedaIdPedidoHistorico(value);
      filtrar(value);
      console.log(value);
    } else if (name === "busquedaFecha") {
      setBusquedaFecha(value);
      filtrar(value);
      console.log(value);
    } else if (name === "busquedaDocumentoCliente") {
      setBusquedaIdCliente(value);
      filtrar(value);
      console.log(value);
    }
  }
  const filtrar = (terminoBusqueda) => {
    let resultadosBusqueda = tablaPedidos.filter((elemento) => {
      console.log(elemento);
      if (elemento._id.toString().includes(terminoBusqueda.toString())) {
        return elemento;
      } else if (
        elemento.cliente.identificacion
          .toString()
          .includes(terminoBusqueda.toString())
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

  useEffect(() => {
    getPedidos();
  }, []);
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
              handleChange={handleChange}
              value={busquedaIdPedidoHistorico}
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
              handleChange={handleChange}
              value={busquedaIdCliente}
              // param={fechaRolIngresoHistoricoInvalid}
            />
          </div>
          <div className="col-md-3">
            <Label text="Fecha de pedido" />

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
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {pedidos?.map((pedido) => (
                <tr key={pedido._id}>
                  <th scope="row">{pedido._id}</th>
                  <td>{pedido.fechaVenta}</td>
                  <td>
                    <ul>
                      {pedido.productos?.map((producto) => (
                        <li>{`${producto.producto.nombre} x${producto.cantidad}`}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{pedido.cliente.name}</td>
                  <td>{pedido.valorTotal}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn btn-danger mr-3"
                      data="data de pruebas"
                      onClick={() => handleDelete(pedido)}
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

export default HistoricoPedidos;
