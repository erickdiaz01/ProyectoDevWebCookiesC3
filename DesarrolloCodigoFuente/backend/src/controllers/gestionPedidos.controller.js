const res = require("express/lib/response");
const gestionPedidos = require("../models/gestionPedidos");

gestionPedidosCtrl = {};

gestionPedidosCtrl.getPedidos = async (req, res) => {
  const pedidos = await gestionPedidos.find();
  res.json(pedidos);
};

gestionPedidosCtrl.getPedido = async (req, res) => {
  const pedido = await gestionPedidos.findById(req.params.id);
  res.json(pedido);
};
gestionPedidosCtrl.deletePedido = async (req, res) => {
  await gestionPedidos.findOneAndDelete(req.params.id);
  res.json({ message: "Pedido eliminado" });
};

gestionPedidosCtrl.editPedido = async (req, res) => {
  const { estado, vendedor } = req.body;
  await gestionPedidos.findOneAndUpdate(
    { _id: req.params.id },
    {
      estado,
      vendedor,
    }
  );
  res.json({message:"pedido editado"})
};

module.exports = gestionPedidosCtrl;
