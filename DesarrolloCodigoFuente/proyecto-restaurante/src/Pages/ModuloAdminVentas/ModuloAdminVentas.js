import React, { useState, useEffect } from "react";

import Input from "../Login/components/Input/Input";
import Label from "../Login/components/Label/Label";
import Title from "../Login/components/Title/Title";
import Table from "react-bootstrap/Table";
import notie from "notie";
import Swal from "sweetalert2";
import "notie/dist/notie.css";
import useAuth from "../../hooks/useAuth";
import { listarProductos } from "../../services/Productos.service";
import { listarClientes } from "../../services/ModuloAdmin.service";
import "./ModuloAdminVentas.css";
import axios from "axios";

const ModuloAdminVentas = () => {
  const auth = useAuth();
  const [carroCompras, setCarroCompras] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [valorTotalVenta, setValorTotalVenta] = useState("");
  const [producto, setProductos] = useState([]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [modoPago, setModoPago] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [nombreProductoInvalid, setNombreProductoInvalid] = useState("");
  const [modoPagoInvalid, setModoPagoInvalid] = useState("");
  const [descripcionInvalid, setDescripcionInvalid] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [direccionCliente, setDireccionCliente] = useState("");
  const [nombreClienteInvalid, setNombreClienteInvalid] = useState(false);
  const [idClienteInvalid, setIdClienteInvalid] = useState(false);
  const [direccionClienteInvalid, setDireccionClienteInvalid] = useState(false);
  const [cantidad, setCantidad] = useState("");
  const [cantidadInvalid, setCantidadInvalid] = useState(false);

  const getProductos = async () => {
    try {
      const { data } = await listarProductos(auth.token);
      console.log(data);
      setProductos(data.productos);
      console.log(data.productos);
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
  const getClientes = async () => {
    try {
      const { data } = await listarClientes(auth.token);
      console.log(data);
      setClientes(data.clientes);
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

  function handleChange(name, value) {
    if (name === "modoPago") {
      if (value === "") {
        setModoPagoInvalid(true);
      } else {
        setModoPagoInvalid(false);
        setModoPago(value);
      }
    } else if (name === "descripcion") {
      setDescripcion(value);
    } else if (name === "nombreProducto") {
      let product = producto.find((prod) => prod.nombre === value);
      console.log(product);
      if (value === "" || !product) {
        setNombreProductoInvalid(true);
      } else {
        setNombreProductoInvalid(false);
        setNombreProducto(value);
      }
    } else if (name === "nombreCliente") {
      if (value === "" || /^[0-9]+$/.test(value)) {
        setNombreClienteInvalid(true);
      } else {
        setNombreClienteInvalid(false);
        setNombreCliente(value);
      }
    } else if (name === "direccionCliente") {
      if (value === "") {
        setDireccionClienteInvalid(true);
      } else {
        setDireccionClienteInvalid(false);
        setDireccionCliente(value);
      }
    } else if (name === "identificacionCliente") {
      if (value === "" || !/^[0-9]+$/.test(value) || value.length < 5) {
        setIdClienteInvalid(true);
      } else {
        setIdClienteInvalid(false);
        setIdCliente(value);
      }
    } else if (name === "cantidadProducto") {
      if (value <= 0 || value === "") {
        setCantidadInvalid(true);
      } else {
        setCantidadInvalid(false);
        setCantidad(value);
      }
    } else if (handleAgregar) {
      setValorTotalVenta(total);
    }
  }

  // function sumaTotal(costoProducto, cantidadProducto) {
  //   total=valorTotalVenta
  //   total=+ costoProducto*cantidadProducto
  //   setValorTotalVenta(total)
  // }
  var total = 0;
  async function handleAgregar(resp) {
    try {
      if (nombreProductoInvalid || cantidadInvalid) {
        return resp.json({
          agregado: false,
          msg: "No se agrego correctamente el producto",
        });
      }

      var productoAListar = await producto.find(
        (prod) => prod.nombre === nombreProducto
      );

      let productoListado = {
        producto: productoAListar,
        cantidad: cantidad,
        peticion: descripcion,
      };

      carroCompras.push(productoListado);
      setListaProductos(carroCompras);
      if (listaProductos.length === 1) {
        let valor =
          listaProductos[0].producto.costo * listaProductos[0].cantidad;
        setValorTotalVenta(valor);
      } else if (carroCompras.length === 1) {
        let valor = carroCompras[0].producto.costo * carroCompras[0].cantidad;
        setValorTotalVenta(valor);
      } else if (listaProductos.length > 1) {
        listaProductos?.forEach((prod) => {
          total += prod.producto.costo * prod.cantidad;
          return total;
        });
        setValorTotalVenta(total);
      }

      console.log(carroCompras);
      console.log(listaProductos);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(valorTotalVenta);

  async function handleSubmit() {
    try {
      if (
        nombreClienteInvalid ||
        idClienteInvalid ||
        direccionClienteInvalid ||
        modoPagoInvalid
      ) {
        notie.alert({
          text: "Llene todos los campos requeridos",
          type: "warning",
          time: 3,
        });
        return console.log("Llene todos los campos requeridos")
       
      }
      let cliente = clientes.find(
        (client) => client.identificacion === idCliente
      );
      if (cliente) {
        let newFactura = {
          valorTotal: valorTotalVenta,
          cliente: cliente,
          productos: listaProductos,
          direccion: direccionCliente,
          modoPago: modoPago,
          entregado: false,
        };
        const { data, status } = await axios.post(
          "http://localhost:4000/api/ventas/pedidos/crear",
          newFactura
        );
        if (status === 200 || 201 || 204) {
          notie.alert({ text: data.message, type: "success", time: 10 });
          return console.log(newFactura);
        }
      } else {
        let newCliente = {
          name: nombreCliente,
          identificacion: idCliente,
        };
        const { data, status } = await axios.post(
          "http://localhost:4000/api/clientes/crear",
          newCliente
        );
        if (status === (200 || 201 )|| 204) {
          console.log(newCliente);
          notie.alert({ text: data.message, type: "success", time: 5 });
          let clienteNuevo = await clientes.find(
            (client) => client.identificacion === idCliente
          );
          console.log(clienteNuevo)
          if (clienteNuevo) {
            let newFactura = {
              valorTotal: valorTotalVenta,
              cliente: clienteNuevo,
              productos: listaProductos,
              direccion: direccionCliente,
              modoPago: modoPago,
            };
            const { status } = await axios.post(
              "http://localhost:4000/api/ventas/pedidos/crear",
              newFactura
            );
            if (status === 200 || 201 || 204) {
              console.log(newFactura);
              notie.alert({
                text: data.message,
                type: "success",
                time: 10,
              });
            }
          }
        }
      }
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

  function handleDelete(index) {
    let valorADescontar =
      listaProductos[index].producto.costo * listaProductos[index].cantidad;

    var newListaProductos = listaProductos.slice();
    let newTotal = valorTotalVenta - valorADescontar;
    listaProductos.splice(index, 1);
    newListaProductos.splice(index, 1);
    if (listaProductos.length >= newListaProductos.length) {
      setListaProductos(listaProductos);
      setValorTotalVenta(newTotal);
    }
  }

  useEffect(() => {
    getProductos();
    getClientes();
  }, []);
  return (
    <div className="moduloAdminVentas-container">
      <div className="moduloAdminVentas-content">
        <Title text="Gestion de ventas" />
        <header className="title-container">
          <h2>(Si es un nuevo cliente, ingrese los datos del cliente sin nigun producto y cree el pedido primero)</h2>
        </header>
        <div className="row">
          <div className="col-md-6">
            <header className="title-container">
              <br />
              <h3>Ingrese información de la venta del producto</h3>
            </header>

            <article className="container">
              <section className="row">
                <Label text="Nombre del producto" />
                <Input
                  attribute={{
                    id: "nombreProducto",
                    name: "nombreProducto",
                    type: "text",
                    placeholder: "Ingrese el nombre del producto",
                    list: "Productos",
                  }}
                  handleChange={handleChange}
                  param={nombreProductoInvalid}
                />
                {nombreProductoInvalid && (
                  <label className="label-error">Producto no encontrado</label>
                )}

                <datalist id="Productos">
                  {producto?.map((producto) => (
                    <option value={producto.nombre}></option>
                  ))}
                </datalist>
              </section>
              <section className="row">
                <Label text="Cantidad" />
                <Input
                  attribute={{
                    id: "cantidadProducto",
                    name: "cantidadProducto",
                    type: "number",
                    placeholder: "Ingrese la cantidad del item",
                  }}
                  handleChange={handleChange}
                  param={cantidadInvalid}
                />
                {cantidadInvalid && (
                  <label className="label-error">Cantidad no valida</label>
                )}
                <br />
              </section>

              <section className="row">
                <Label text="Comentario o peticion del producto" />
                <textarea
                  name="descripcion"
                  className="regular-style"
                  placeholder="Ingrese alguna peticion especial sobre el producto"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                ></textarea>
              </section>
              <div className="submit-button-container">
                <button onClick={handleAgregar} className="submit-button">
                  Agregar Producto
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
                  <th># Producto</th>
                  <th>Nombre producto</th>
                  <th>Comentarios producto</th>
                  <th>Cantidad producto</th>
                  <th>Valor total</th>
                  <th>Retirar producto</th>
                </tr>
              </thead>
              <tbody>
                {listaProductos?.map((prod, index) => (
                  <tr key={prod.producto._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{prod.producto.nombre}</td>
                    <td>{prod.peticion}</td>
                    <td>{prod.cantidad}</td>
                    <td>{prod.cantidad * prod.producto.costo}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn btn-danger mr-3"
                        data="data de pruebas"
                        onClick={() =>
                          handleDelete(listaProductos.indexOf(prod))
                        }
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" style={{ fontWeight: "bolder" }}>
                    Total factura
                  </td>
                  <td colSpan="2" style={{ fontWeight: "bolder" }}>
                    {valorTotalVenta}
                  </td>
                </tr>
              </tbody>
            </Table>
            <section className="row">
              <div className="col-md-6">
                <div className="row">
                  <Label text="Nombre" />
                  <Input
                    attribute={{
                      id: "nombreCliete",
                      name: "nombreCliente",
                      type: "text",
                      placeholder: "Ingrese el nombre del cliente",
                    }}
                    handleChange={handleChange}
                    param={nombreClienteInvalid}
                  />
                  {nombreClienteInvalid && (
                    <label className="label-error">Nombre obligatorio</label>
                  )}
                </div>
                <div className="row">
                  <Label text="Dirección/Mesa" />
                  <Input
                    attribute={{
                      id: "direccionCliete",
                      name: "direccionCliente",
                      type: "text",
                      placeholder: "Ingrese la dirección del cliente",
                    }}
                    handleChange={handleChange}
                    param={direccionClienteInvalid}
                  />
                  {direccionClienteInvalid && (
                    <label className="label-error">
                      Dirección o mesa obligatoria
                    </label>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <Label text="Número de identificación" />
                  <Input
                    attribute={{
                      id: "identificacionCliente",
                      name: "identificacionCliente",
                      type: "text",
                      placeholder: "Ingrese la identificación del cliente",
                    }}
                    handleChange={handleChange}
                    param={idClienteInvalid}
                  />
                  {idClienteInvalid && (
                    <label className="label-error">ID no valido</label>
                  )}
                </div>

                <Label text="Metodo de pago" />
                <div className="input-container">
                  <select
                    required
                    id="modoPago"
                    name="modoPago"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    className={
                      modoPagoInvalid ? "input-error" : "regular-style"
                    }
                    value={modoPago}
                  >
                    <option value=""></option>
                    <option value="Tarjeta de credito">
                      Tarjeta de Credito
                    </option>
                    <option value="Tarjeta de debito">Tarjeta de Debito</option>
                    <option value="PSE">PSE</option>
                    <option value="Efectivo">Efectivo contraentrega</option>
                  </select>
                  {modoPagoInvalid && (
                    <label className="label-error">
                      Metodo de pago obligatorio
                    </label>
                  )}
                </div>
              </div>
            </section>

            <section className="row">
              <div className="submit-button-container">
                <button onClick={handleSubmit} className="submit-button">
                  Crear Pedido
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuloAdminVentas;
