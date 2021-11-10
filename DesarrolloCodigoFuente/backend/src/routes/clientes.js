const { Router } = require("express");
const resp = require("express");
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {crearCliente , getClientes, editarCliente, eliminarCliente, getCliente}=require("../controllers/clientes");


router.post(
    "/crear",[
        check("name","El nombre es obligatorio").not().isEmpty(),
        check("identificacion", "La identificacion es obligatoria").not().isEmpty(),
    
        validarCampos

    ],
    crearCliente
)

router.put(
    "/verclientes/modificar/:id",[
        check("name","El nombre es obligatorio").not().isEmpty(),
        check("identificacion", "La identificacion es obligatoria").not().isEmpty(),
        validarCampos

    ],
    editarCliente
)

router.get(
    "/verclientes",
    getClientes
)

router.get(
    "/verclientes/:id",
    getCliente
)

router.delete(
    "/verclientes/eliminar/:id",
    eliminarCliente
)



module.exports = router;
