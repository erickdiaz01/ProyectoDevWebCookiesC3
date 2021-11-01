const { response } = require("express");
const { validationResult } = require("express-validator");
const createProduct = require("../models/createProduct");
const Categoria = require("../models/Categoria")

const crearProducto = async (req, resp = response) => {
  try {
    const { id, categoria, nombre, cantidad, costo, descripcion, imagen } =
      req.body;
    let newProduct = await createProduct.findOne({ nombre });
    if (newProduct) {
      return resp.status(400).json({
        ok: false,
        msg: "Ya existe el producto",
      });
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
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Error al guardar producto",
    });
  }
};

const getProductos = async (req, resp = response) => {


    // const productos = await Producto.find();

    // const productos = await Producto.find()
    //                                 .populate('category');

    const productos = await createProduct.find()
                                    .populate('categoria', 'name');    

    resp.status(200).json({
        ok: true,
        msg: 'Lista de Productos',
        productos
    });
}

const getProducto = async (req, res) => {
  const producto = await createProduct.findById(req.params.id);
  res.json(producto);
};

const editarProducto = async (req, res) => {
  const { categoria, nombre, descripcion, costo, cantidad } = req.body;
  await createProduct.findOneAndUpdate(
    { _id: req.params.id },
    { categoria, nombre, descripcion, costo, cantidad }
  );
  res.json({ message: "producto editado" });
};

const eliminarProducto = async (req, res) => {
  await createProduct.findOneAndDelete(req.params.id);
  res.json({ message: "Producto eliminado" });
};

module.exports = {
  crearProducto,
  getProductos,
  editarProducto,
  eliminarProducto,
  getProducto,
};
