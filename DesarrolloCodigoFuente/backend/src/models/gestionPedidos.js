const { Schema, model } = require("mongoose");

const gestionPedidosSchema = new Schema({
  idPedido: String,
  estado: String,
  vendedor: {
    type: String,
    trim: true,
  },
});

module.exports = model("gestionamientoPedidos", gestionPedidosSchema);
