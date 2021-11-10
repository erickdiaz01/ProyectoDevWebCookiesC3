import React, { useEffect, useState } from "react";
import Input from "../Login/components/Input/Input";
import Label from "../Login/components/Label/Label";
import Title from "../Login/components/Title/Title";
import { listarProductos, verProducto } from "../../services/Productos.service";
import axios from "axios";

import "../CreateProduct/CreateProduct.css";
import useAuth from "../../hooks/useAuth";
import notie from "notie";
import Swal from "sweetalert2";
import "notie/dist/notie.css";
import InputOnlyRead from "../ModificarProducto/InputOnlyRead/InputOnlyRead";
const EditProduct = () => {
  const auth = useAuth();
  const [producto, setProducto] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");
  const [costo, setCosto] = useState("");
  const [imagen, setImagen] = useState("");

  const [cantidadInvalid, setCantidadInvalid] = useState(false);
  const [nombreInvalid, setNombreInvalid] = useState(false);
  const [costoInvalid, setCostoInvalid] = useState(false);
  const [categoriaInvalid, setCategoriaInvalid] = useState(false);

  function handleChange(name, value) {
    if (name === "categoriaProducto") {
      if (value === "") {
        setCategoriaInvalid(true);
      } else {
        setCategoria(value);
        setCategoriaInvalid(false);
        console.log(value);
      }
    } else if (name === "nombreProducto") {
      if (value === "") {
        setNombreInvalid(true);
      } else {
        setNombreInvalid(false);
        setNombre(value);
      }
    } else if (name === "cantidadInicial") {
      if (value < 0) {
        setCantidadInvalid(true);
      } else if (value === "") {
        setCantidadInvalid(false);
        setCantidad(value);
      } else {
        setCantidadInvalid(false);
        setCantidad(value);
      }
    } else if (name === "costoUnitario") {
      if (value <= 0 || value === "") {
        setCostoInvalid(true);
      } else {
        setCostoInvalid(false);
        setCosto(value);
      }
    } else if (name === "descripcion") {
      setDescripcion(value);
    } else if (name === "imagen") {
      setImagen(value);
    }
  }
  async function handleSubmit(resp) {
    console.log(resp);
    try {
      let updateProduct = {
        categoria: categoria,
        nombre: nombre,
        cantidad: cantidad,
        costo: costo,
        descripcion: descripcion,
        imagen: imagen,
      };

      const { status, data } = await axios.put(
        `http://localhost:4000/api/productos/verproductos/modificar/${producto._id}`,
        updateProduct
      );
      console.log("status", status);
      console.log(updateProduct);
      if (status === 204) {
        notie.alert({ text: data.message, type: "success", time: 10 });
      } else if (status === 200) {
        notie.alert({ text: data.message, type: "success", time: 10 });
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
        notie.alert({ text: error.response.data.message, type: "error", time: 10 });
      }
    }
  }

  async function getProduct() {
    try {
      var idProduct = window.location.pathname.substring(
        18,
        window.location.pathname.length
      );

      const { data } = await verProducto(auth.token, idProduct);
      console.log(data);
      setProducto(data);
      setCategoria(data.categoria);
      setNombre(data.nombre);
      setCantidad(data.cantidad);
      setCosto(data.costo);
      setDescripcion(data.descripcion);
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
  }
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="createProduct-container">
      <div className="createProduct-content">
        <Title text="Edite el producto" />
        <div className="row">
          <Label text="ID producto" />
          <InputOnlyRead
            attribute={{
              id: "idProducto",
              name: "idProducto",
              type: "text",
              placeholder: `${producto._id}`,
              default: `${producto._id}`,
            }}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <Label text="Categoria del producto" />

            <select
              required
              id="categoriaProducto"
              name="categoriaProducto"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className={categoriaInvalid ? "input-error" : "regular-style"}
              // defaultValue={producto.categoria}
              value={categoria}
            >
              <option value=""></option>
              <option value="6175dd79ab49ae193a6e0f14">Fritos</option>
              <option value="6175dd93ab49ae193a6e0f15">Comida Rapida</option>
              <option value="6175ddbaab49ae193a6e0f16">
                Carnes a la parrilla
              </option>
              <option value="6175ddd4ab49ae193a6e0f17">Pollo Asadero</option>
              <option value="61783eb7886220db79ecc225">Sopas</option>
              <option value="6175dde7ab49ae193a6e0f18">Bebidas</option>
              <option value="61783ec7886220db79ecc226">Adicionales</option>
            </select>
            {categoriaInvalid && (
              <label className="label-error">Categoria obligatoria</label>
            )}
          </div>

          <div className="col-md-6">
            <Label text="Nombre del producto" />
            <Input
              attribute={{
                id: "nombreProducto",
                name: "nombreProducto",
                type: "text",
                placeholder: "Nombre del producto",
                defaultValue: `${nombre}`,
              }}
              handleChange={handleChange}
              param={nombreInvalid}
              className="regular-style"
            />
            {nombreInvalid && (
              <label className="label-error">Nombre obligatorio</label>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Label text="Cantidad incial de inventario" />
            <Input
              attribute={{
                id: "cantidadInicial",
                name: "cantidadInicial",
                type: "number",
                placeholder: "Inventario inicial",
                defaultValue: `${cantidad}`,
              }}
              handleChange={handleChange}
              param={cantidadInvalid}
            />
            {cantidadInvalid && (
              <label className="label-error">
                Cantidad igual o mayor a cero
              </label>
            )}
          </div>
          <div className="col-md-6">
            <Label text="Costo unitario" />
            <Input
              attribute={{
                id: "costoUnitario",
                name: "costoUnitario",
                type: "number",
                placeholder: "Costo del producto",
                defaultValue: `${costo}`,
              }}
              handleChange={handleChange}
              param={costoInvalid}
            />
            {costoInvalid && (
              <label className="label-error">Costo obligatorio</label>
            )}
          </div>
        </div>

        <div className="row">
          <Label text="Descripción del producto" />
          <textarea
            rows="10"
            cols="12"
            className="regular-style"
            name="descripcion"
            placeholder="Ingrese la descripción del producto (Ingredientes)"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            defaultValue={descripcion}
          ></textarea>

          <div className="row">
            <Label text="Ingrese imagen" />
            <Input
              attribute={{
                id: "imagen",
                name: "imagen",
                type: "file",
                placeholder: "",
                accept: ".jpg , .png, .jpeg , .svg",
              }}
              style={{ justifyContent: "center", alingContent: "center" }}
              handleChange={handleChange}

              // param={}
            />
          </div>
        </div>
        <div className="submit-button-container">
          <button onClick={handleSubmit} className="submit-button">
            Guardar actualización
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
