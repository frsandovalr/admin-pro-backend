const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario'); //Importa el modelo
const { generarJWT } = require('../helpers/jwt');



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


module.exports = {
    login
}