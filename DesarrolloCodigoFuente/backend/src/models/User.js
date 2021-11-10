const { Schema, model } = require("mongoose");

const createUserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    identificacion: {
      type: String,
  
      
    },

    password: {
      type: String,
      required: true,
    },
    confirmacionPassword: {
      type: String,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    nacimiento: {
      type: Date
    },
    sexo: {
      type: String
    },
    rol: {
      type: Schema.Types.ObjectId,
        ref: 'Rol',
        default: '61759f0c42205b65b5e04409',
        required: true
    },
    fechaIngreso: {
      type: Date,
      default: Date.now,
    },
    idToken: {
      type: String
  }
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", createUserSchema);
