const {Router} = require("express");
const router =Router();
const {getHistoricoPedido,getHistoricoPedidos,editPedido}=require("../controllers/historicoPedidos.controller")

router.route("/").get(getHistoricoPedidos);

router.route("/:id").get(getHistoricoPedido).put(editPedido);

module.exports = router;