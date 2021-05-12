const {Schema , model} = require ('mongoose');

//Crea la tabla en la BD
const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
   
    img: {
        type: String,

    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }

});

//Parsea en un objeto Medico JSon y filtra campos q no se enviaran a la respuesta a Postman
MedicoSchema.method('toJSON', function () {
   const{__v, ...object} = this.toObject();
   return object;
});

//Exporta el Modelo e indica que esquema utiliza
module.exports = model('Medico', MedicoSchema);