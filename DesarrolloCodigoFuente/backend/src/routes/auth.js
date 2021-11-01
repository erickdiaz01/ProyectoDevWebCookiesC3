const { Router } = require("express");
const router = Router();
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarGoogleAuth } = require('../middlewares/validar-google-auth');
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
// const { validarJWT } = require('../middlewares/validar-jwt');
const {
  crearUsuario,
  loginUsuario,
  getUsuario,
  getUsuarios,
  editarUsuario,
  eliminarUsuario,
  revalidarToken,
  validarUsuarioGoogle,
} = require("../controllers/auth");


// router.post(
//     '/',
//     [
//         check('email', 'El email es obligatorio').isEmail(),
//         check('password', 'La password debe ser de 6 caracteres').isLength({min: 6}),
//         validarCampos
//     ],
//     loginUsuario);

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);
router.get("/renew", validarJWT, revalidarToken);

router.post("/google/login", validarGoogleAuth, validarUsuarioGoogle);

router.post(
  "/crearusuario",
  [
    check("name", "El name es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario
);

router.put(
  "/verusuarios/editar/:id",
  [
    check("name", "El name es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La password es obligatoria").isInt(),
    check("confirmacionpassword", "La de la password es obligatoria")
      .not()
      .isEmpty(),
    check("identificacion", "La identificacion es obligatoria").not().isEmpty(),
    check("nacimiento", "La fecha de nacimiento es obligatoria")
      .not()
      .isEmpty(),
    check("sexo", "El sexo es obligatorio").not().isEmpty(),
    check("rol", "El rol es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  editarUsuario
);

router.get("/verusuarios", getUsuarios);

router.get("/verusuarios/:id", getUsuario);

router.delete("/verusuarios/eliminar/:id", eliminarUsuario);

module.exports = router;
