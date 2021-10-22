const { Schema, model } = require("mongoose");

const busquedaProductSchema = new Schema({
  idProducto: String,
  categoria: String,
  nombreProducto: {
    type: String,
    trim: true,
  },
});

const modificarProductSchema = new Schema({
    idProducto:String,
    categoria:String,
    nombre:String,
    descripcion:String,
    valor:Number,
    stock:Number
},{
    timestamps:true
})

module.exports = model("busquedaProducto", busquedaProductSchema) , model("modificarProducto", modificarProductSchema);