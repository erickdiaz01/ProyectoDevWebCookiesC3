const res = require("express/lib/response");
const {
  busquedaHistoricoPedidos,
  historicoPedidos,
} = require("../models/historicoPedidos");

historicoPedidosCtrl = {};

historicoPedidosCtrl.getHistoricoPedidos = async (req, res) => {
  const pedidos = await busquedaHistoricoPedidos.find();
  res.json(pedidos);
};
historicoPedidosCtrl.getHistoricoPedido = async (req, res) => {
  const pedido = await historicoPedidos.findById(req.params.id);
  res.json(pedido);
};

historicoPedidosCtrl.editPedido = async (req, res) => {
  const { fecha, cliente, descripcion, valor } = req.body;
  await historicoPedidos.findOneAndUpdate(
    { _id: req.params.id },
    { fecha, cliente, descripcion, valor }
  );
  res.json({ message: "pedido editado" });
};

module.exports = historicoPedidosCtrl;
