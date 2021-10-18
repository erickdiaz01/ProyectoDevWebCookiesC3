const { Schema, model } = require("mongoose");

const createProductSchema = new Schema({
  categoria: {
    type: String,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true,
  },
  cantidad:Int8Array,

  costo: {
    type: Float32Array,
    required: true,
  },
  descripcion:{
      type:String,
      required:true
  },
  imagen:File
}, {
    timestamps: true
});

module.exports = model("creacionProducto", createProductSchema)