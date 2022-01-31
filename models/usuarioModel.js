const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true
    },
    nombre: {
        type:String,
        required:true
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

