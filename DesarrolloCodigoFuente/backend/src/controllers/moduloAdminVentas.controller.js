const { response } = require("express");
const Factura = require("../models/Factura");
const Cliente = require("../models/Cliente");
const creacionProducto = require("../models/createProduct");

const agregarPedido = async (req, resp = response) => {
  try {
    const {fechaVenta, valorTotal, cliente, productos, entregado, direccion, modoPago } = req.body;
    let newFactura = await Factura.findOne({ 
      $and: 
        [ 
          {valorTotal}, 
          {cliente} ,
          {entregado},
          {direccion},
          {modoPago}
        ] 
     });
     console.log(newFactura)

    if (newFactura) {
      return resp.json({
        agregado: false,
        message: "No se agrego correctamente la factura, factura ya existente",
      });
      
    }
    newFactura = new Factura(req.body);
    await newFactura.save();
    resp.status(201).json({
      ok: true,
      message: "Pedido creado",
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
      message: "Error al guardar el registro",
    });
  }
};
const editarEntregado = async (req,resp=response)=>{
  const { fechaVenta, valorTotal, cliente, productos, entregado,direccion, modoPago } = req.body;
  await Factura.findOneAndUpdate(
    { _id: req.params.id },
    {  entregado }
  );
  resp.json({ message: "Pedido entregado" });
}
const editarPedido = async (req, resp = response) => {
  const { fechaVenta, valorTotal, cliente, productos, entregado,direccion, modoPago } = req.body;

  await Factura.findOneAndUpdate(
    { _id: req.params.id },
    { fechaVenta, valorTotal, cliente, productos, entregado,direccion,modoPago }
  );
  resp.json({ message: "Pedido editado" });
};

const getPedidos = async (req, resp = response) => {
  // const productos = await Producto.find();

  // const productos = await Producto.find()
  //                                 .populate('category');

  const pedidos = await Factura
    .find()
    .populate("cliente")
    .populate("productos.producto");

  resp.status(200).json({
    ok: true,
    message: "Lista de Pedidos",
    pedidos,
  });
};

const eliminarPedido = async (req, resp = Response) => {
  let pedido = await Factura.findById(req.params.id);
  pedido.delete()
  // await Factura.findOneAndDelete(req.params.id);
  resp.json({ message: "Pedido eliminado", pedido
 });
};

const getPedido = async (req, res = response) => {
  const pedido = await Factura.findById(req.params.id).populate("cliente").populate("productos.producto");
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
        message: "No se agrego correctamente el producto, producto ya existente",
      });
    }
    addProducto = new Factura.productos(req.body);
    await newFactura.save();
    resp.status(201).json({
      ok: true,
      message: "Pedido creado",
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
      message: "Error al guardar el registro",
    });
  }
};
module.exports = {
  agregarPedido,
  getPedidos,
  editarPedido,
  eliminarPedido,
  getPedido,
  editarEntregado
};
