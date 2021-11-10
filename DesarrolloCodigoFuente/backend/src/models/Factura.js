const { Schema, model } = require("mongoose");



const facturaSchema = new Schema(
  {
    fechaVenta: {
      type: Date,
      default: Date.now,
    },
    valorTotal: Number,
    cliente: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
    },
    productos: [
      {
        producto: {
          type: Schema.Types.ObjectId,
          ref: "creacionProducto",
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
        },
        peticion: {
          type: String,
        },
      },
    ],
    entregado:{
        type:Boolean,
        default:false
    },
    direccion:{
      type:String,
      required:true},
    modoPago:{
      type:String,
      required:true
    }

  },
  {
    timestamps: true,
  }
);

module.exports = model('Factura', facturaSchema);
