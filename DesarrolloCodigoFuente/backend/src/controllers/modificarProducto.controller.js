const res = require("express/lib/response");
const modificarProducto = require("../models/modificarProducto");
modificarProductoCtrl = {};

modificarProductoCtrl.getProducts = async (req, res) => {
  const productos = await modificarProducto.find();
  res.json(productos);
};
modificarProductoCtrl.getProduct = async (req, res) => {
  const producto = await modificarProducto.findById(req.params.id);
  res.json(producto);
};
modificarProductoCtrl.editProduct = async (req, res) => {
  const { categoria, nombre, descripcion, valor, stock } = req.body;
  await modificarProducto.findOneAndUpdate(
    { _id: req.params.id },
    { categoria, nombre, descripcion, valor, stock }
  );
  res.json({ message: "producto editado" });
};
modificarProductoCtrl.deleteProduct = async(req, res) => {
  await modificarProducto.findOneAndDelete(req.params.id);
  res.json({ message: "Producto eliminado" });
};

module.exports = modificarProductoCtrl;
