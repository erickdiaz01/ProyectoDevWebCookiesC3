const { Router } = require("express");
const router = Router();
const { getProduct,getPedido,editProduct,deleteProduct,createPedido } = require("../controllers/moduloAdminVentas.controller");

router.route("/").get(getPedido).post(createPedido);

router.route("/:id").get(getProduct).put(editProduct).delete(deleteProduct);

module.exports = router;