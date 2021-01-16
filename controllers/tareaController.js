const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult}= require('express-validator');
const { findByIdAndUpdate } = require('../models/Proyecto');

//Crea una nueva tarea 
exports.crearTarea = async (req,res)=>{

    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    
    try {
        //Extraer el proyecto y comprobar si existe
        const {proyecto} = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }   

        //Revisar si proyecto actual pertenece a usuario autenticado
        //Verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Crear Tarea
        const tarea = new Tarea(req.body);
        //Guardar la Tarea
        await tarea.save();
        res.json({tarea});


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    } 
    
}

//Obtiene las tareas por proyecto
exports.obtenerTareas = async (req,res)=>{
    try {
        //Extraer el proyecto y comprobar si existe
        const {proyecto} = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }   
        
        //Revisar si proyecto actual pertenece a usuario autenticado
        //Verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Obtener las tareas por proyecto
        const tareas = await Tarea.find({ proyecto });
        res.json({tareas});


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Actualiza tareas
exports.actualizarTarea = async (req,res)=>{
    try {
        //Extraer el proyecto y comprobar si existe
        const {proyecto, nombre, estado} = req.body;
        
        //Revisar si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({msg: 'No existe esa Tarea'});
        }

        //Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        
        //Revisar si proyecto actual pertenece a usuario autenticado
        //Verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Crear un objeto con la nueva informacion 
        const nuevaTarea = {};

        if (nombre) nuevaTarea.nombre = nombre;
        if (estado) nuevaTarea.estado = estado; 

        //Guardar la Tarea
        tarea = await Tarea.findOneAndUpdate({_id : req.params.id}, nuevaTarea, {new : true});
        res.json({tarea})


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Elimina una Tarea
exports.eliminarTarea = async (req,res)=>{
    try {
        //Extraer el proyecto y comprobar si existe
        const {proyecto} = req.body;
        
        //Revisar si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({msg: 'No existe esa Tarea'});
        }

        //Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);
        
        //Revisar si proyecto actual pertenece a usuario autenticado
        //Verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea Eliminada'});


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}