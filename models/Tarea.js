const moongose = require('mongoose');

const TareaSchema = moongose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    estado:{
        type: Boolean,
        default: false
    },
    creado:{
        type: Date,
        default: Date.now()
    },
    proyecto:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }

});

module.exports = mongoose.model('Tarea',TareaSchema);