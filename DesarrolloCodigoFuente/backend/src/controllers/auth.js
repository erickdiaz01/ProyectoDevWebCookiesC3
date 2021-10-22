const createUser = require("../models/createUser");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const crearUsuario = async (req, resp = response) => {
  const {
    nombre,
    identificacion,
    contraseña,
    confirmacionContraseña,
    correo,
    nacimiento,
    sexo,
    rol,
    fechaIngreso,
  } = req.body;
  try {
    let usuario = await createUser.findOne({ correo });

    if (usuario) {
      return resp.status(400).json({
        ok: false,
        msg: "ya existe un usuario registrado con este email",
      });
    }

    if (contraseña != confirmacionContraseña) {
      return resp.status(400).json({
        ok: false,
        msg: "Las contraseñas no coinciden",
      });
    }
    usuario = new createUser(req.body);

    /**Encriptando contraseña */
    const salt = bcrypt.genSaltSync();
    usuario.contraseña = bcrypt.hashSync(contraseña, salt);

    await usuario.save();

    resp.status(201).json({
      ok: true,
      msg: "Usuario creado de manera exitosa",
      uid: usuario.id,
      name: usuario.nombre,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "error al guardar el registro",
    });
  }
};

const loginUsuario = async (req, resp = response) => {
  const { correo, contraseña } = req.body;

  try {
    /**Confirmar email */
    let usuario = await createUser.findOne({ correo });

    if (!usuario) {
      resp.status(400).json({
        ok: true,
        msg: "Usuario o contraseña erradas",
      });
    }

    /**Confirmar email */

    const validPassword = bcrypt.compareSync(contraseña, usuario.contraseña);

    if (!validPassword) {
      resp.status(400).json({
        ok: false,
        msg: "Usuario o contraseña erradas",
      });
    }

    /**Generar Token */
    //   const token = await generarJWT(usuario.id, usuario.name);

    //   resp.json({
    //     ok: true,
    //     msg: "Ok",
    //     uid: usuario.id,
    //     name: usuario.name,
    //     token,
    //   });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: "error al autenticar",
    });
  }
};

module.exports = { crearUsuario, loginUsuario};
