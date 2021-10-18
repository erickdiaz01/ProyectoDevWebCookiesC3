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
    idPedido:String,
    fecha:Date,
    cliente:String,
    descripcion:String,
    valor:Float32Array
})

module.exports = model("busquedaHistoricoPedidos", busquedaHistoricoPedidosSchema) , model("historicoPedidos", historicoPedidosSchema);
