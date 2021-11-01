const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  agregarPedido,
  getPedidos,
  editarPedido,
  eliminarPedido,
  getPedido,
} = require("../controllers/moduloAdminVentas.controller");

router.post(
  "/crear/",
  [
    check("fechaVenta", "La fecha es obligatoria").not().isEmpty(),
    check("valorTotal", "El valor total es obligatorio").isInt(),
    check("cliente", "El cliente es obligatorio").not().isEmpty(),
    check("productos", "Los productos son obligatorios").not().isEmpty(),
    validarCampos,
  ],
  agregarPedido
);

router.put(
  "/verpedidos/editarventa/:id",
  [
    check("fechaVenta", "La fecha es obligatoria").not().isEmpty(),
    check("valorTotal", "El valor total es obligatorio").isInt(),
    check("cliente", "El cliente es obligatorio").not().isEmpty(),
    check("productos", "Los productos son obligatorios").not().isEmpty(),
    validarCampos,
  ],
  editarPedido
);

router.delete("/verpedidos/eliminarventa/:id", eliminarPedido);



router.get("/verpedidos", getPedidos);

router.get("/verpedidos/:id", getPedido)



module.exports = router;
