const { Schema, model } = require("mongoose");

const createUserSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    identificacion: {
      type: String,
      required: true,
      unique: true,
    },

    contraseña: {
      type: String,
      required: true,
    },
    confirmacionContraseña: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
    },
    nacimiento: {
      type: Date,
      required: true,
    },
    sexo: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: true,
    },
    fechaIngreso: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("creacionUsuario", createUserSchema);
