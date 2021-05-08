
const {Schema , model} = require ('mongoose');

//Crea la tabla en la BD
const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,

    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
});

//Parsea en un objeto Usuario JSon y filtra campos q no se enviaran a la respuesta a Postman
UsuarioSchema.method('toJSON', function () {
   const{__v, _id, password, ...object} = this.toObject();
   
   object.uid = _id;  //renombra el _id a uid para enviarlo con ese nombre a postman
   return object;
});

//Exporta el Modelo e indica que esquema utiliza
module.exports = model('Usuario', UsuarioSchema);