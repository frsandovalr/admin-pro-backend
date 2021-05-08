/* 
Ruta: /api/login

 */

const { Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
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






//Exporta el router 
module.exports = router;