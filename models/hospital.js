
const {Schema , model} = require ('mongoose');

//Crea la tabla en la BD
const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
   
    img: {
        type: String,

    },
    usuario:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales'});

//Parsea en un objeto Usuario JSon y filtra campos q no se enviaran a la respuesta a Postman
HospitalSchema.method('toJSON', function () {
   const{__v, ...object} = this.toObject();
   return object;
});

//Exporta el Modelo e indica que esquema utiliza
module.exports = model('Hospital', HospitalSchema);