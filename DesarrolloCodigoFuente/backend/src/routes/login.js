const { Router } = require("express");
const router = Router();
const { getUser, createUser } = require("../controllers/login.controller");

router.route("/").get(getUser).post(createUser);

module.exports = router;
