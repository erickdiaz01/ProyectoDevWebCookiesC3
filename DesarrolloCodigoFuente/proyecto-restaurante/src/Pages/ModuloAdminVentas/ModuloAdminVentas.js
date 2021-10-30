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
import "./ModuloAdminVentas.css";


const ModuloAdminVentas = () => {
  const auth = useAuth();
  const [carroCompras, setCarroCompras] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);

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
      let product = producto.find(prod => prod.nombre===value);
      console.log(product)
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
    }
  }

  

   async function handleAgregar(resp) {
    try {
      if (nombreProductoInvalid || cantidadInvalid) {
        return resp.json({
          agregado: false,
          msg: "No se agrego correctamente el producto",
        });
      }

      var productoAListar = await producto.find(prod => prod.nombre===nombreProducto)
      

      let productoListado = {
        producto: productoAListar,
        cantidad: cantidad,
        peticion: descripcion,
      };
      
       await carroCompras.push(productoListado);
       setListaProductos(carroCompras)
       console.log(carroCompras)
      console.log(listaProductos)
    } catch (error) {
      console.log(error);

    }
  }
  function handleSubmit() {
    let account = {
      valorTotalVenta,
      modoPago,
      descripcion,
    };
    if (account) {
    }
  }

  useEffect(() => {
    getProductos();
  }, []);
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
                  rows="10"
                  cols="12"
                  className="regular-style"
                  placeholder="Ingrese alguna peticion especial sobre el producto"
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
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" style={{ fontWeight: "bolder" }}>
                    Total factura
                  </td>
                  <td>
                    {/* {listaProductos?.map((product) => {
                      let total = 0;
                      while (product) {
                        total += product.cantidad * product.producto.costo;
                      }
                      return total;
                    })} */}
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
