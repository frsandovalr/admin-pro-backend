require('dotenv').config();

const express = require ('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');
// Crear el servidor de express
const app = express();

// Coneccion a la Base de Datos
dbConnection();

//Configurar CORS
app.use(cors());

//Lectura y parseo del Body
app.use ( express.json());


//console.log(process.env);

//Rutas
app.use ('/api/usuarios', require('./routes/usuarios'));
app.use ('/api/login', require('./routes/auth'));


app.listen (process.env.PORT, () => {

    console.log ('Servidor corriendo en puerto ' + process.env.PORT);
});
