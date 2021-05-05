const mongoose = require('mongoose');

const dbConnection = async() =>{

    //user:  mean_user
    // pass:  N@38R@j3mKhfvQk

    try {
        await mongoose.connect( process.env.DB_CNN, {
             useNewUrlParser: true, 
             useUnifiedTopology: true,
             useCreateIndex: true
         });
         console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inciar la Base de Datos');
    }

}

module.exports = {
    dbConnection
}