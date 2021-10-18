const { Router } = require("express");
const res = require("express/lib/response");
const router = Router();

const {getProduct,createProduct}=require("../controllers/createProduct.controller")


router.route("/").get(getProduct).post(createProduct);

module.exports = router;
