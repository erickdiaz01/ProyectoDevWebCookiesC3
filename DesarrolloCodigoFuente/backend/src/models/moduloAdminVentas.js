const { Schema, model } = require("mongoose");

const agregarProductSchema = new Schema({
  idProducto:{
      type:String,
      required:true
  },
  cantidad:{
      type:Number,
      required:true
  },
  valor:Number,
  fechaVenta:Date,
  metodoPago:{
      type:String,
      required:true
  },
  peticiones:String
});

const visualizarFacturaSchema = new Schema({
    idProducto:String,
    nombre:String,
    descripcion:String,
    cantidad:Number,
    valor:Number,
   
},{
    timestamps:true
})
const agregarProducto = model("agregarProduct", agregarProductSchema) ;
const visualizarFactura= model("visualizarFactura", visualizarFacturaSchema);
module.exports = {agregarProducto, visualizarFactura}