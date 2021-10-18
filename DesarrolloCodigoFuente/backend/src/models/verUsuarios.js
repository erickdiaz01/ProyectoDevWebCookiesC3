const { Schema, model } = require("mongoose");

const busquedaUsuariosSchema = new Schema({
  idUsuario:String,
  rol:String,
  nombre:{
      type:String,
      trim:true
  }
});

const visualizarUsuariosSchema = new Schema({
    idUsuario:String,
    rol:String,
    descripcion:String,
    nombre:String
})

module.exports = model("busquedaUsuarios", busquedaUsuariosSchema) , model("visualizarUsuarios", visualizarUsuariosSchema);