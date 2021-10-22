const {Router} = require("express");
const router =Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
const { crearUsuario, loginUsuario, revalidarToken, validarUsuarioGoogle } = require('../controllers/auth');
// const { validarGoogleAuth } = require('../middlewares/validar-google-auth');

// router.post(
//     '/', 
//     [
//         check('correo', 'El correo es obligatorio').isEmail(),
//         check('contraseña', 'La contraseña debe ser de 6 caracteres').isLength({min: 6}),
//         validarCampos
//     ],
//     loginUsuario);

router.post(
    '/login', 
    [
        check('correo', 'El correo es obligatorio').isEmail(),
        check('contraseña', 'La contraseña debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    loginUsuario);

router.post(
    '/crearusuario', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        check('contraseña', 'La contraseña debe ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ], 
    crearUsuario);


module.exports = router;