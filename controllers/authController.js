const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuarios = async (req,res) =>{

    //Revisar si hay errores de validacion
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    //Extraer el email y password
    const {email, password} = req.body;

    try {
        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});

        if(!usuario){
            return res.status(400).json({msg: 'El usuario no existe'});
        }

        //Revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({msg: 'el password es incorrecto'})
        }

        //si todo es correcto crear JWT
        //Crear y firmar el JWT
        const payload = {
            usuario:{
                id: usuario.id
            }
        };
        //Firmar el jwt jsonwebtoken
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn: 36000 //1 hora
        },(error,token)=>{
            if(error) throw error;

        //Mensaje de confirmacion 
        res.json({token});

        });

    } catch (error) {
        console.log(error);
    }

}