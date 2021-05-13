/* 
Ruta: /api/login

 */

const { Router} = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Registra Usuario
router.post( 
    '/',
    //Valida los campos antes de registrar el usuario
    [
        check('password','El password es obligarotio').not().isEmpty(),
        check('email','El email es obligarotio').isEmail(),
        validarCampos
    ], 
     login
    );

    router.post( 
        '/google',
        //Valida los campos antes de registrar el usuario
        [
            check('token','El token de Google es obligarotio').not().isEmpty(),
            validarCampos
        ], 
         googleSingIn
        );


//Exporta el router 
module.exports = router;