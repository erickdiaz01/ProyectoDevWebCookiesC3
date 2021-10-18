const {Router} = require("express");
const router =Router();
const {getUser,createUser}=require("../controllers/createUser.controller")

router.route("/").get(getUser).post(createUser);

module.exports = router;