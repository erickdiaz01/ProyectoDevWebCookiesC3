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
  cantidad:Number,

  costo: {
    type:Number,
    required: true,
  },
  descripcion:{
      type:String,
      required:true
  },
  imagen:String
}, {
    timestamps: true
});

module.exports = model("creacionProducto", createProductSchema)