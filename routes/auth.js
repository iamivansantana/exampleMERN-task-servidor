//Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');


//Crea un usuario
// api/auth
//agregando reglas de validacion con check()
router.post('/',
[
    check('email','Agrega un email valido').isEmail(),
    check('password','el password debe ser minimo de 6 caracteres').isLength({min: 6})
],
authController.autenticarUsuarios
    
);
module.exports = router;