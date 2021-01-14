//primeras inttalaciones
//npm init
//npm install -D nodemon
//npm i express mongoose dotenv

//usar mongoose para la conexion
const mongoose = require('mongoose');

//requerimos string de conexion
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false
        });
        console.log('DB Conectada');
    } catch (error) {
        console.log(error);
        process.exit(1); //Detener la app
    }
}

module.exports = conectarDB;