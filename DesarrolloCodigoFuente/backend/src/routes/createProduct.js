const { Router } = require("express");
const res = require("express/lib/response");
const router = Router();

const {crearProducto}=require("../controllers/createProduct.controller")


router.route("/").post(crearProducto);

module.exports = router;
