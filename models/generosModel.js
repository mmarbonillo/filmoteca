const mongoose = require('mongoose');

const generosSchema = new mongoose.Schema({
    nombre: {
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Genero', generosSchema);