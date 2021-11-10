const User = require("../models/User");
const { response } = require("express");
const Rol = require('../models/Rol');
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, resp = response) => {
  const {
    name,
    identificacion,
    password,
    confirmacionPassword,
    email,
    nacimiento,
    sexo,
    rol,
    fechaIngreso,
  } = req.body;
  try {
    let usuario = await User.findOne({ email });

    if (usuario) {
      return resp.status(400).json({
        ok: false,
        message: "ya existe un usuario registrado con este email",
      });
    }

    if (password != confirmacionPassword) {
      return resp.status(400).json({
        ok: false,
        message: "Las passwords no coinciden",
      });
    }
    usuario = new User(req.body);

    /**Encriptando password */
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    resp.status(201).json({
      ok: true,
      message: "Usuario creado de manera exitosa",
      uid: usuario.id,
      name: usuario.name,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      message: "error al guardar el registro",
    });
  }
};

const loginUsuario = async (req, resp = response) => {
  const { email, password } = req.body;

  try {
    /**Confirmar email */

    let usuario = await User.findOne({ email });

    if (!usuario) {
      resp.status(400).json({
        ok: true,
        message: "Usuario o password erradas",
      });
    }

    /**Confirmar email */

    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      resp.status(400).json({
        ok: false,
        message: "Usuario o password erradas",
      });
    }

    /**Generar Token */
    const token = await generarJWT(usuario.id, usuario.name);

    resp.json({
      ok: true,
      message: "Ok",
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      message: "error al autenticar",
    });
  }
};

const revalidarToken = async (req, resp = response) => {
  const { uid, name } = req;

  /**Generar Nuevo Token */
  const token = await generarJWT(uid, name);

  resp.json({
    ok: true,
    token: token,
  });
};

const validarUsuarioGoogle = async (req, resp = response) => {
  const { uid, name, email } = req;

  try {
    /**Confirmar email */
    let usuario = await User.findOne({ email, idToken: uid }).populate(
      "rol"
    );
    

    if (usuario) {
      console.log(usuario);

      if (usuario.rol.name === "Indefinido") {
        resp.status(401).json({
          ok: false,
          message: "El usuario aun no ha sido autorizado por el administrador",
        });
      } else {
        /**Generar Token */
        const token = await generarJWT(usuario.id, usuario.name);

        resp.json({
          ok: true,
          message: "Ok",
          uid: usuario.id,
          name: usuario.name,
          token,
        });
      }
    } else {
      usuario = new User({ name, email, password: uid, idToken: uid });

      const newUser = await usuario.save();
      resp.status(201).json({
        ok: true,
        message: "Usuario creado de manera exitosa, para poder acceder comuniquese con el administrador",
        uid: usuario.id,
        name: usuario.name,
      });
    }
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      message: "error al autenticar",
    });
  }
};

const getUsuarios = async (req, resp = response) => {
  const usuario = await User.find().populate("rol");
  resp.json(usuario);
};

const getUsuario = async (req, resp = response) => {
  const usuario = await User.findById(req.params.id);
  resp.json(usuario);
};

const editarUsuario = async (req, resp = response) => {
  const {
    name,
    identificacion,
    password,
    confirmacionPassword,
    email,
    nacimiento,
    sexo,
    rol,
    fechaIngreso,
  } = req.body;

  try {
    let usuario = await User.findOne({ email });

    if (password != confirmacionPassword) {
      return resp.status(400).json({
        ok: false,
        message: "Las passwords no coinciden",
      });
    }
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        name,
        identificacion,
        password,
        confirmacionPassword,
        email,
        nacimiento,
        sexo,
        rol,
        fechaIngreso,
      }
    );
    resp.status(201).json({
      ok: true,
      message: "Usuario editado de manera exitosa",
      uid: usuario.id,
      name: usuario.name,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      message: "error al editar el usuario",
    });
  }
};

const eliminarUsuario = async (req, resp = response) => {
  let usuario = await User.findById(req.params.id);
  usuario.delete();
  // await User.findOneAndDelete(req.params.id);
  resp.json({ message: "Usuario eliminado" , usuario});
};

const getRoles = async (req, resp = response) => {
  const roles = await Rol.find();
  resp.json(roles);
};
module.exports = {
  crearUsuario,
  loginUsuario,
  validarUsuarioGoogle,
  revalidarToken,
  getUsuario,
  getUsuarios,
  editarUsuario,
  eliminarUsuario,
  getRoles
};
