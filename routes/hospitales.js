/* 
Ruta: /api/hospitales

 */

const { Router} = require('express');
const { check } = require('express-validator');
const { getHospitales, crearHospitales, actualizarHospitales, borrarHospitales } = require('../controllers/hospitales');

//importa el middlewar
const { validarCampos } = require('../middlewares/validar-campos');

//importa controladores

const { validarJWT } = require('../middlewares/validar-jwt');
 

const router = Router();

// Lista Hospitales
router.get( '/', getHospitales);
 
// Registra Hospital
router.post( 
    '/',
    //Valida los campos antes de registrar el usuario
    [
        validarJWT,
        check('nombre','El nombre del hospital es obligarotio').not().isEmpty(),
        validarCampos, // Ejecuta el middlewares validar campos de usuario
    ], 
    crearHospitales
    );
    

// Actualiza Hospital por el id
router.put('/:id',
    [
                
        
    ],
    actualizarHospitales);


// Borrar Hospital por el id
router.delete('/:id',

    borrarHospitales);


//Exporta el router 
module.exports = router;
