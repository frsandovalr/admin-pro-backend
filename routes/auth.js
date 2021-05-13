/* 
Ruta: /api/login

 */

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Registra Usuario
router.post(
    '/',
    //Valida los campos antes de registrar el usuario
    [
        check('password', 'El password es obligarotio').not().isEmpty(),
        check('email', 'El email es obligarotio').isEmail(),
        validarCampos
    ],
    login
);

router.post(
    '/google',
    //Valida los campos antes de registrar el usuario
    [
        check('token', 'El token de Google es obligarotio').not().isEmpty(),
        validarCampos
    ],
    googleSingIn
);

router.get(
    '/renew',
    //Valida los campos antes de registrar el usuario
    validarJWT,
    renewToken
);

//Exporta el router 
module.exports = router;