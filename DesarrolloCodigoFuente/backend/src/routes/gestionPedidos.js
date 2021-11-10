const { Router } = require("express");
const router = Router();
const {getPedido,getPedidos,editPedido,deletePedido}= require("../controllers/gestionPedidos.controller")

router.route("/").get(getPedidos);

router.route("/:id").get(getPedido).put(editPedido).delete(deletePedido);

module.exports = router;
