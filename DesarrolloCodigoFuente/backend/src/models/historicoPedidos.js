const { Schema, model } = require("mongoose");

const busquedaHistoricoPedidosSchema = new Schema({
  idPedido: String,
  documentoCliente: String,
  cliente: {
    type: String,
    trim: true,
  },
});

const historicoPedidosSchema = new Schema({
  idPedido: String,
  fecha: Date,
  cliente: String,
  descripcion: String,
  valor: Number,
});
const busquedaHistoricoPedidos = model(
  "busquedaHistoricoPedidos",
  busquedaHistoricoPedidosSchema
);
const historicoPedidos = model("historicoPedidos", historicoPedidosSchema);
module.exports = { busquedaHistoricoPedidos, historicoPedidos };
