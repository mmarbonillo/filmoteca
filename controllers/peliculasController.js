
const mongoose = require('mongoose');
const Pelicula = require('../models/peliculasModel');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const express = require('express');
const app = express();
app.use(fileUpload())


class Peliculas {

    constructor(){}

    listarPeliculasActivas(){
        let peliculas = Pelicula.find({"estado": true});
        return peliculas;
    }

    listarPeliculasActivas(numPage, sizePage){
        let peliculas = Pelicula.find({"estado": true}).skip(numPage-1).limit(sizePage);
        return peliculas;
    }

    verPelicula(id){
        let pelicula = Pelicula.findById(id);
        return pelicula;
    }
    
    crearPelicula(body, files){
        let EDFile = files.imagen;
        let nombreImagen = EDFile.name;
        EDFile.mv(`resources/img/peliculas/${nombreImagen}`,err => {
            if(err) console.log(err);
        })
        let pelicula = new Pelicula({
            titulo       : body.titulo,
            descripcion  : body.desc,
            anyo         : body.anyo,
            valoracion   : body.valoracion,
            etiquetas    : body.etiquetas,
            estado       : body.estado,
            imagen       : nombreImagen
        });
        let resultado = pelicula.save();
        return resultado;
    }
    
     actualizarPelicula(id, body, files){
        let EDFile;
        let nombreImagen = body.imagenActual;
        if(files != null){
            //Borramos la imagen anterior
            fs.unlink(`resources/img/peliculas/${body.imagenActual}`);
            EDFile = files.imagen;
            nombreImagen = EDFile.name;
            EDFile.mv(`resources/img/peliculas/${nombreImagen}`,err => {
                if(err) console.log(err);
            })
        }
        //nombreImagen == "" ? body.imagenActual : nombreImagen;
        let pelicula = Pelicula.findByIdAndUpdate(id, {
            $set: {
                titulo       : body.titulo,
                descripcion  : body.descripcion,
                anyo         : body.anyoEdit,
                valoracion   : body.valorValoracion,
                etiquetas    : body.unGenero,
                imagen       : nombreImagen
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