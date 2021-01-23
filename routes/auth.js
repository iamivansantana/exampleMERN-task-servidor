//Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');


//Iniciar sesion
// api/auth
//agregando reglas de validacion con check()
router.post('/',
authController.autenticarUsuarios
);

router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports = router;