const { Router } = require("express");
const router = Router();
const { getProduct,getProducts,editProduct,deleteProduct } = require("../controllers/modificarProducto.controller");

router.route("/").get(getProducts);

router.route("/:id").get(getProduct).put(editProduct).delete(deleteProduct);

module.exports = router;