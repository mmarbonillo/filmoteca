const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
    titulo: {
        type:String,
        required: true
    },
    descripcion: {
        type:String,
        required:false
    },    
    anyo: {
        type: Number,
        default: true
    },
    imagen: {
        type: String,
        required: false        
    },
    valoracion: {
        type: Number,
        required: true
    },
    etiquetas: {
        type: Array,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Pelicula', peliculaSchema);