const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario'); //Importa el modelo
const { generarJWT } = require('../helpers/jwt');


// Controlador que lista Usuarios
const getUsuarios = async (req, res) => {

    const desde = Number (req.query.desde) || 0; //crea el parametro para la paginacion
    //console.log(desde);

    //crea una coleccion de promesas 
    const [usuarios, total] = await Promise.all([
     
        Usuario
        .find({}, 'nombre email role google img')
        .skip( desde)
        .limit (5),

        Usuario.countDocuments() //cuenta la cantidad de registros
    ]);

    // Envia la respuesta al postman
    res.json({
        ok: true,
        usuarios,
        total
        //uid: req.uid
    });

}

// Controlador que registra usuario
const crearUsuario = async (req, res = response) => {

    const { email, password, nombre } = req.body;

    try {
        //Valida que el email no exista en la BD
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya esta registrado'
            });
        }
        // Asigna una instancia del json obtenido en el reques
        const usuario = new Usuario(req.body); 

        ///Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guarda el usuario BD
        await usuario.save();

        //Generar el TOKEN JWT
        const token = await generarJWT(usuario.id);
        // Envia la respuesta al postman
        res.json({
            ok: true,
            usuario: usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

}

// Controlador que actualizar usuario

const actualizarUsuario = async (req, res = response) => {

     //Todo: Validar token ---

    const uid = req.params.id;
    try {
         //Valida que el ID exista en la BD
        const usuarioDB = await Usuario.findById( uid);

        if ( !usuarioDB ){

            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        const {password, google, email, ...campos} = req.body;
        //Valida que el email no exista en la BD


        if ( usuarioDB.email != email ) {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya esta registrado'
            });
          }

        }
        
        //Actualizaciones
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate (uid, campos, {new: true});

        // Envia la respuesta al postman
        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

        
    } catch (error) {
        console.log ();
        res.status(500).json ({
            ok: false,
            msg: 'Error inesperado'
        });

    }

}


// Controlador que borra usuario
const borrarUsuario = async (req, res = response) => {


    const uid = req.params.id;
    try {

        //Valida que el ID exista en la BD
        const usuarioDB = await Usuario.findById( uid);

        if ( !usuarioDB ){

            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Borra el usuario de la BD
        await Usuario.findByIdAndDelete( uid);
         // Envia la respuesta al postman
         res.json({
            ok: true,
            msg: 'Usuario eliminado correctamente'
        });
        
    } catch (error) {
        console.log ();
        res.status(500).json ({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}
// Exporta los controladores
module.exports = {
    getUsuarios, crearUsuario , actualizarUsuario , borrarUsuario
}


