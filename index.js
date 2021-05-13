require('dotenv').config();

const express = require ('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');
// Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del Body
app.use ( express.json());

// Coneccion a la Base de Datos
dbConnection();

//Directorio publico
app.use( express.static('public') );



//console.log(process.env);

//Rutas
app.use ('/api/usuarios', require('./routes/usuarios'));
app.use ('/api/hospitales', require('./routes/hospitales'));
app.use ('/api/medicos', require('./routes/medicos'));
app.use ('/api/login', require('./routes/auth'));
app.use ('/api/todo/', require('./routes/busquedas'));
app.use ('/api/upload/', require('./routes/uploads'));


app.listen (process.env.PORT, () => {

    console.log ('Servidor corriendo en puerto ' + process.env.PORT);
});
