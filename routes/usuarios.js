/* 
Ruta: /api/usuarios

 */

const { Router} = require('express');
const { check } = require('express-validator');

//importa el middlewar
const { validarCampos } = require('../middlewares/validar-campos');

//importa controladores
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
 

const router = Router();

// Lista usuarios
router.get( '/', validarJWT, getUsuarios);
 
// Registra Usuario
router.post( 
    '/',
    //Valida los campos antes de registrar el usuario
    [
       check('nombre','El nombre es obligarotio').not().isEmpty(),
       check('password','El password es obligarotio').not().isEmpty(),
       check('email','El email es obligarotio').isEmail(),
       validarCampos, // Ejecuta el middlewares validar campos de usuario
    ], 
    crearUsuario 
    );

// Actualiza Usuario por el id
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligarotio').not().isEmpty(),
        check('email', 'El email es obligarotio').isEmail(),
        check('role', 'El role es obligarotio').not().isEmpty(),
        validarCampos, // Ejecuta el middlewares validar campos de usuario
    ],
    actualizarUsuario);


// Borrar Usuario por el id
router.delete('/:id',
validarJWT,
    borrarUsuario);


//Exporta el router 
module.exports = router;