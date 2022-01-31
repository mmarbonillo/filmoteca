const express = require('express');
const Pelicula = require('../models/peliculasModel');
const usuarioModel = require('../models/usuarioModel');
const Peliculas = require('../controllers/peliculasController')
const ruta = express.Router();

var peli = new Peliculas();
/*async function listarPeliculasActivas(){
    let peliculas = await Pelicula.find({"estado": true});
    return peliculas;
}*/

/*ruta.get('/',(req, res) => {
    let resultado = listarPeliculasActivas();
    resultado.then(peliculas => {
        res.json(peliculas);
    }).catch(err => {
        res.status(400).json(err);
    })
});*/

ruta.get('/', (req, res) => {
    let resultado = peli.listarPeliculasActivas();
    resultado.then(peliculas => {
        res.render("index.ejs", { 
            titulo: "Index EJS",
            peliculas: peliculas
        
        });
    }).catch(err => {
        res.status(400).json(err);
    })
})

ruta.post('/', (req, res) => {
    //console.log(req.body);
    let resultado = peli.crearPelicula(req.body);

    resultado.then(peliculas => {
        res.json({
            status: true
        })
    }).catch(err => {
        res.status(400).json({
            status: false
        })
    })
});

ruta.delete('/:id', (req, res) => {
    let resultado = peli.desactivarPelicula(req.params.id);
    resultado.then(pelicula => {
        res.json(pelicula);
    }).catch(err => {
        res.status(400).json(err);
    })
})

ruta.put('/:id', (req, res) => {
    let resultado = peli.actualizarPelicula(req.params.id, req.body);
    resultado.then(pelicula => {
        res.json(pelicula)
    }).catch(err => {
        res.status(400).json(err)
    })
})


module.exports = ruta;