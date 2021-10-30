const { response } = require("express");
const Factura = require("../models/Factura");
const Cliente = require("../models/Cliente");
const creacionProducto = require("../models/createProduct");

const agregarPedido = async (req, resp = response) => {
  try {
    const { id, fechaVenta, valorTotal, cliente, productos, entregado } =
      req.body;
    const newFactura = await Factura.findOne({
      fechaVenta,
      valorTotal,
      cliente,
      productos,
      entregado,
    });

    if (newFactura) {
      return resp.json({
        agregado: false,
        msg: "No se agrego correctamente la factura, factura ya existente",
      });
    }
    newFactura = new Factura(req.body);
    await newFactura.save();
    resp.status(201).json({
      ok: true,
      msg: "Pedido creado",
      id,
      fechaVenta,
      valorTotal,
      cliente,
      productos,
      entregado,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Error al guardar el registro",
    });
  }
};

const editarPedido = async (req, resp = response) => {
  const { fechaVenta, valorTotal, cliente, productos, entregado } = req.body;

  await Factura.findOneAndUpdate(
    { _id: req.params.id },
    { fechaVenta, valorTotal, cliente, productos, entregado }
  );
  resp.json({ message: "Pedido editado" });
};

const getPedidos = async (req, resp = response) => {
  // const productos = await Producto.find();

  // const productos = await Producto.find()
  //                                 .populate('category');

  const pedidos = await Factura
    .find()
    .populate("cliente", "name")
    .populate("productos.producto", "name");

  resp.status(200).json({
    ok: true,
    msg: "Lista de Pedidos",
    pedidos,
  });
};

const eliminarPedido = async (req, resp = Response) => {
  await Factura.findOneAndDelete(req.params.id);
  resp.json({ message: "Pedido eliminado" });
};

const getPedido = async (req, res = response) => {
  const pedido = await Factura.findById(req.params.id);
  res.json(pedido);
};

const agregarProducto = async (req, resp = response) => {
  try {
    const { producto, cantidadProducto, peticion } =
      req.body;
    const addProducto = await Factura.productos.findOne({
      producto
    });

    if (addProducto) {
      return resp.json({
        agregado: false,
        msg: "No se agrego correctamente el producto, producto ya existente",
      });
    }
    addProducto = new Factura.productos(req.body);
    await newFactura.save();
    resp.status(201).json({
      ok: true,
      msg: "Pedido creado",
      id,
      fechaVenta,
      valorTotal,
      cliente,
      productos,
      entregado,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "Error al guardar el registro",
    });
  }
};
module.exports = {
  agregarPedido,
  getPedidos,
  editarPedido,
  eliminarPedido,
  getPedido,
};
