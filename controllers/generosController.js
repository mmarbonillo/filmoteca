
const mongoose = require('mongoose');
const Genero = require('../models/generosModel');
const express = require('express');
const app = express();

class Generos {

    constructor(){}

    generoPorPelicula(gens){
        let etiqu = Genero.find({_id: {$in: gens}});
        return etiqu;
    }

    getGeneros(){
        let generos = Genero.find({"estado": true});
        return generos;
    }

    getUnGenero(gen){
        let genero = Genero.find({"nombre": gen});
        return genero;
    }
}

module.exports = Generos;