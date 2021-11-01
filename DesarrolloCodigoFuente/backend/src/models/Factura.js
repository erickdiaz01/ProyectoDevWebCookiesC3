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
        cantidadProducto: {
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
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model('Factura', facturaSchema);
