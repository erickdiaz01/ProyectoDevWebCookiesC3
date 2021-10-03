import React from "react";
import Input from "../Login/components/Input/Input";
import Label from "../Login/components/Label/Label";
import Title from "../Login/components/Title/Title";

import "./CreateProduct.css";

const CreateProduct = () => {
  return (
    <div className="createProduct-container">
      <div className="createProduct-content">
        <Title text="Cree un producto" />
        <div className="row">
          <Label text="ID producto" />
          <Input
            attribute={{
              id: "idProducto",
              name: "idProducto",
              type: "text",
              placeholder: "Id de producto",
            }}
            //   handleChange={handleChange}

            // param={}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <Label text="Categoria del producto" />
            <select
              required
              id="categoriaProducto"
              name="categoriaProducto"
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
          <div className="col-md-6">
            <Label text="Nombre del producto" />
            <Input
              attribute={{
                id: "nombreProducto",
                name: "nombreProducto",
                type: "text",
                placeholder: "Nombre del producto",
              }}
              //   handleChange={handleChange}

              // param={}
              className="regular-style"
            />
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
              }}
              //   handleChange={handleChange}

              // param={}
            />
          </div>
          <div className="col-md-6">
            <Label text="Costo unitario" />
            <Input
              attribute={{
                id: "costoUnitario",
                name: "costoUnitario",
                type: "number",
                placeholder: "Costo del producto",
              }}
              //   handleChange={handleChange}

              // param={}
            />
          </div>
        </div>

        <div className="row">
          <Label text="Descripción del producto" />
          <textarea
            rows="10"
            cols="12"
            className="regular-style"
            placeholder="Ingrese la descripción del producto (Ingredientes)"
          ></textarea>

          <div className="row">
            <Label text="Ingrese imagen" />
            <Input
              attribute={{
                id: "costoUnitario",
                name: "costoUnitario",
                type: "file",
                placeholder: "",
                accept: ".jpg , .png, .jpeg , .svg",
              }}
              style={{ justifyContent: "center", alingContent: "center" }}

              //   handleChange={handleChange}

              // param={}
            />
          </div>
        </div>
        <div className="submit-button-container">
          <button
            //   onClick={handleSubmit}
            className="submit-button"
          >
            Agregar producto
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
