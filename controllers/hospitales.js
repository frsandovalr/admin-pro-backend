const { response } = require('express');

const Hospital = require('../models/hospital'); //Importa el modelo


const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
                                     .populate('usuario','nombre img');

    // Envia la respuesta al postman
    res.json({
        ok: true,
        hospitales

    });

}
const crearHospitales = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body});


    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB 

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
    // Envia la respuesta al postman

}
const actualizarHospitales = async (req, res = response) => {

    // Envia la respuesta al postman
    res.json({
        ok: true,
        msg: 'Actualizar Hospitales'

    });

}
const borrarHospitales = async (req, res = response) => {

    // Envia la respuesta al postman
    res.json({
        ok: true,
        msg: 'Borrar Hospitales'

    });

}



module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales

}