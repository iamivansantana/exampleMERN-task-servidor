//primeras inttalaciones
//npm init
//npm install -D nodemon
//npm i express mongoose dotenv
//npm install bcryptjs = para ocultar passwords
//npm i express-validator
//npm install jsonwebtoken
//npm i cors

const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Crear el servidor
const app = express();
 
//Conectar a la base de Datos
conectarDB();

//Habilitar cors (para recibir peticiones de una url diferente)
app.use(cors());

//habilitar express.json
app.use(express.json({extended: true}));

//PUERTO DE LA APP
const PORT = process.env.PORT || 4001;

//Importar Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//ARRANCA LA APP
app.listen(PORT, ()=>{
    console.log(`el servidor esta funcionando en el puerto ${PORT}`);
})