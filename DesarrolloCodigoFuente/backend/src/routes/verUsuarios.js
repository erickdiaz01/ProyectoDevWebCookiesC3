const { Router } = require("express");
const router = Router();
const {getUser,getUsers,editUser,deleteUser  } = require("../controllers/verUsuarios.controller");

router.route("/").get(getUsers);
router.route("/:id").get(getUser).put(editUser).delete(deleteUser);

module.exports = router;