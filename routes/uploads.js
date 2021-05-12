/*
ruta api/uploads/
*/
const { Router} = require('express');
const { fileUpload, retornaImagen } = require('../controllers/uploads');
const expressFileUpload = require('express-fileupload');

//importa controladores

const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.use( expressFileUpload() );
// Busqueda de todos las tablas
router.put('/:tipo/:id',validarJWT, fileUpload );

router.get('/:tipo/:foto', retornaImagen );


 

//Exporta el router 
module.exports = router;