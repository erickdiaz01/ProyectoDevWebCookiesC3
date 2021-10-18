const { Schema, model } = require("mongoose");

const agregarProductSchema = new Schema({
  idProducto:{
      type:String,
      required:true
  },
  cantidad:{
      type:Int16Array,
      required:true
  },
  valor:Float32Array,
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
    cantidad:Int16Array,
    valor:Float32Array,
   
})

module.exports = model("agregarProduct", agregarProductSchema) , model("visualizarFactura", visualizarFacturaSchema);