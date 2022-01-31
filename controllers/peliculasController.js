
const mongoose = require('mongoose');
const Pelicula = require('../models/peliculasModel');


class Peliculas {

    constructor(){}

    listarPeliculasActivas(){
        let peliculas = Pelicula.find({"estado": true});
        return peliculas;
    }
    
     crearPelicula(body){
        let pelicula = new Pelicula({
            titulo       : body.titulo,
            descripcion  : body.desc,
            anyo         : body.anyo,
            valoracion   : body.valoracion,
            etiquetas    : body.etiquetas,
            estado       : body.estado
        });
        let resultado = pelicula.save();
        return resultado;
    }
    
     actualizarPelicula(id, body){
        let pelicula = Pelicula.findByIdAndUpdate(id, {
            $set: {
                titulo       : body.titulo,
                descripcion  : body.desc,
                anyo         : body.anyo,
                valoracion   : body.valoracion,
                etiquetas    : body.etiquetas,
                estado       : body.estado
            }
        }, {new: true});
        return pelicula;
    }
     desactivarPelicula(id){
        let pelicula = Pelicula.findByIdAndUpdate(id, {
            $set: {
                estado: false
            }
        }, {new: true});
        return pelicula;
    }
}

module.exports = Peliculas;

/*module.exports = {
    listarPeliculasActivas: listarPeliculasActivas,
    crearPelicula: crearPelicula,
    actualizarPelicula: actualizarPelicula,
    desactivarPelicula: desactivarPelicula
}*/