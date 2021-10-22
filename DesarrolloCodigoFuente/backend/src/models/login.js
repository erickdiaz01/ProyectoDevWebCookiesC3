const { Schema, model } = require("mongoose");

const loginSchema = new Schema({
  correo: { type: String, required: true },
  contraseña:{
      type:String,
      required:true
  }
});

module.exports = model("login", loginSchema);
