const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true,
        unique: true,
        index: true
    },
    nombreUsuario: {
        type:String,
        required:true,
        unique: true,
        index: true
    },
    password: {
        type:String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
    
});

module.exports = mongoose.model('Usuario', usuarioSchema);

