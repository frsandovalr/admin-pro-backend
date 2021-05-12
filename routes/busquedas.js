/*
ruta api/todo/:busqueda
*/
const { Router} = require('express');
const { getTodo, getDocumentosColeccion } = require('../controllers/busqueda');

//importa controladores

const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

// Busqueda de todos las tablas
router.get('/:busqueda',validarJWT, getTodo );

// Busqueda de tables en una colleccion
router.get('/coleccion/:tabla/:busqueda',validarJWT, getDocumentosColeccion );


 

//Exporta el router 
module.exports = router;