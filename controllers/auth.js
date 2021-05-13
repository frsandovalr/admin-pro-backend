const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario'); //Importa el modelo
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');



const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //Valida que el email exista en la BD
        const usuarioBD = await Usuario.findOne({ email });

        if (!usuarioBD) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no valida..'
            });
        }

        //Verificar Contraseña

        const validPassword = bcrypt.compareSync(password, usuarioBD.password);
        if (!validPassword) {

            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });

        }

        //Generar el TOKEN JWT
        const token = await generarJWT(usuarioBD.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log();
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }


}

const googleSingIn = async( req, res= response ) =>{

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify ( googleToken);

        // 
        const usuarioDB = await Usuario.findOne({email});

        let usuario;

        if (!usuarioDB){
            //si no existe el usuario
            usuario = new Usuario ({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {

            usuario = usuarioDB;
            usuario.google = true;

        }

        //Guardar en BD
        await usuario.save();

        //Generar el TOKEN JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.log (error);
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }


}


const renewToken = async (req, res= response) =>{

    const uid = req.uid;

    const token = await generarJWT( uid);

    res.json({
        ok: true,
        token
    });

}
module.exports = {
    login,
    googleSingIn,
    renewToken
}