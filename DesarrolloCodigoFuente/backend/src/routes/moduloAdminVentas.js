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
  editarEntregado
} = require("../controllers/moduloAdminVentas.controller");

router.post(
  "/pedidos/crear",
  [
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
    
    check("valorTotal", "El valor total es obligatorio").isInt(),
    check("cliente", "El cliente es obligatorio").not().isEmpty(),
    check("productos", "Los productos son obligatorios").not().isEmpty(),
    validarCampos,
  ],
  editarPedido
);
router.put(
  "/verpedidos/editarventa/editarentregado/:id",
  editarEntregado
);

router.delete("/verpedidos/eliminarventa/:id", eliminarPedido);



router.get("/verpedidos", getPedidos);

router.get("/verpedidos/:id", getPedido)


module.exports = router;
