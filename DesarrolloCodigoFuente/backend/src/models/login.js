const { Schema, model } = require("mongoose");

const loginSchema = new Schema({
  usuario: { type: String, required: true },
  contraseña:{
      type:String,
      required:true
  }
});

module.exports = model("login", loginSchema);
