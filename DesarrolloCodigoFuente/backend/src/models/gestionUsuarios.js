const { Schema, model } = require("mongoose");

const gestionUsuariosSchema = new Schema({
  rol: String,
  permisos: String,
  estado:String
});

module.exports = model("gestionamientoUsuarios", gestionUsuariosSchema);