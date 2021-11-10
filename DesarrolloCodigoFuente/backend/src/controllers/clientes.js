const { response } = require("express");
const { validationResult } = require("express-validator");
const Cliente = require("../models/Cliente");

const crearCliente = async (req, resp = response) => {
  try {
    const { name, identificacion } = req.body;
    let newCliente = await Cliente.findOne({ identificacion });
    if (newCliente) {
      return resp.status(400).json({
        ok: false,
        message: "Ya existe el cliente",
      });
    }
    newCliente = new Cliente(req.body);
    await newCliente.save();

    resp.json({
      ok: true,
      message: "Cliente creado, refresque la pagina y cree el pedido con el mismo cliente",
      name,
      identificacion,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      message: "Error al crear cliente",
    });
  }
};

const getClientes = async (req, resp = response) => {
  const clientes = await Cliente.find();

  resp.status(200).json({
    ok: true,
    message: "Lista de Clientes",
    clientes,
  });
};

const getCliente = async (req, res) => {
  const cliente = await Cliente.findById(req.params.id);
  res.json(cliente);
};

const editarCliente = async (req, res) => {
  const { name, identificacion } = req.body;
  await Cliente.findOneAndUpdate(
    { _id: req.params.id },
    { name, identificacion }
  );
  res.json({ message: "Cliente editado" });
};

const eliminarCliente = async (req, res) => {
  await Cliente.findOneAndDelete(req.params.id);
  res.json({ message: "Cliente eliminado" });
};

module.exports = {
  crearCliente,
  getClientes,
  editarCliente,
  eliminarCliente,
  getCliente,
};
