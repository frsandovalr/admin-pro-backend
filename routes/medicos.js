/* 
Ruta: /api/medicos

 */

const { Router} = require('express');
const { check } = require('express-validator');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');

//importa el middlewar
const { validarCampos } = require('../middlewares/validar-campos');

//importa controladores

const { validarJWT } = require('../middlewares/validar-jwt');
 

const router = Router();

// Lista Medicos
router.get( '/', getMedicos);
 
// Registra Medico
router.post( 
    '/',
    //Valida los campos antes de registrar el usuario
    [
        validarJWT,
        check('nombre','El nombre del medico es obligarotio').not().isEmpty(),
        check('hospital','El id del Hospital no es valido').isMongoId(),
        validarCampos, // Ejecuta el middlewares validar campos de usuario
    ], 
    crearMedico
    );

// Actualiza Medico por el id
router.put('/:id',
    [
        validarJWT,
        check('nombre','El nombre del medico es obligarotio').not().isEmpty(),
        check('hospital','El id del Hospital no es valido o falta id de hospital').isMongoId(),
        validarCampos,
    ],
    actualizarMedico);


// Borrar Medico por el id
router.delete('/:id', validarJWT, borrarMedico);


//Exporta el router 
module.exports = router;
