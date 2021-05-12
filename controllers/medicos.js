const { response } = require('express');

const Medico = require('../models/medico'); //Importa el modelo


const getMedicos = async (req, res = response) => {
    
    const medicos = await Medico.find()
    .populate('usuario','nombre img')
    .populate('hospital','nombre img');

    // Envia la respuesta al postman
    res.json({
        ok: true,
        medicos
        
    });

}
const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico ({
        usuario: uid,
        ...req.body});

        try {

            const medicoDB = await medico.save();

            // Envia la respuesta al postman
            res.json({
                ok: true,
                medico: medicoDB 
            });
            
        } catch (error) {
            console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... hable con el administrador'
        });
        }

}
const actualizarMedico = async (req, res = response) => {

    // Envia la respuesta al postman
    res.json({
        ok: true,
        msg: 'Actualizar Medico'
        
    });

}
const borrarMedico = async (req, res = response) => {

    // Envia la respuesta al postman
    res.json({
        ok: true,
        msg: 'Borrar Medico'
    
    });

}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico

}