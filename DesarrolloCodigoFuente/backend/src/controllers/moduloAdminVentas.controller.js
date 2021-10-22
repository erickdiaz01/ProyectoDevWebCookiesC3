const res = require("express/lib/response");
const {
  agregarProducto,
  visualizarFactura,
} = require("../models/moduloAdminVentas");
moduloAdminVentasCtrl = {};

moduloAdminVentasCtrl.getPedido = async (req, res) => {
  const pedido = await visualizarFactura.findById(req.params.id);
  console.log(pedido)
};
moduloAdminVentasCtrl.createPedido = async (req, res) => {
  const { nombre, descripcion, cantidad, valor } = req.body;
  const newFactura = new visualizarFactura({
    nombre,
    descripcion,
    cantidad,
    valor,
  });

  console.log(newFactura);
  res.json({ message: "factura created" });
   await newFactura.save();
};

moduloAdminVentasCtrl.editProduct = (req, res) => res.send();
moduloAdminVentasCtrl.deleteProduct = (req, res) => res.send();
moduloAdminVentasCtrl.getProduct = (req, res) => res.send();

module.exports = moduloAdminVentasCtrl;
