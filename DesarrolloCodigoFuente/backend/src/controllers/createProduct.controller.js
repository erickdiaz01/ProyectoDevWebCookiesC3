const { response } = require("express");
const {validationResult}=require("express-validator")
const createProduct = require("../models/createProduct");



const crearProducto = async (req, resp = response) => {
  try {

    const { id, categoria, nombre, cantidad, costo, descripcion, imagen } =
      req.body;
      let newProduct = await createProduct.findOne({nombre});
      if(newProduct){
        return resp.status(400).json({
          ok:false,
          msg:"Ya existe el producto"
        })
      }
    newProduct = new createProduct(req.body);
    await newProduct.save();

    resp.status(201).json({
      ok: true,
      msg: "producto creado",
      id,
      categoria,
      nombre,
      cantidad,
      costo,
      descripcion,
      imagen,
    });
  } catch (error) {
    console.log(error)
    resp.status(500).json({
      ok:false,
      msg:"Error al guardar producto"
    })
  }
};

module.exports = { crearProducto };
