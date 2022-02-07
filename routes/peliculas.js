const express = require('express');
const Pelicula = require('../models/peliculasModel');
const usuarioModel = require('../models/usuarioModel');
const Peliculas = require('../controllers/peliculasController');
const Etiqueta = require('../models/generosModel');
const Generos = require('../controllers/generosController');
const verificarUsuario = require('../middlewares/auth');
const ruta = express.Router();

var peli = new Peliculas();
var genero = new Generos();


//Index de películas. Lista las películas
ruta.get('/', verificarUsuario, (req, res) => {
    let resultado = peli.listarPeliculasActivas(1, 6);
    resultado.then(peliculas => {
        let totalPeliculas = peli.contarPeliculas();
        totalPeliculas.then(total => {
            res.render("index.ejs", { 
                titulo: "Index EJS",
                peliculas: peliculas,
                totalPeliculas: total[0].totalPelis
            });
        })
    }).catch(err => {
        res.status(400).json(err);
    })
});

/* index con paginacion */
ruta.get('/:numPage/:numFills', verificarUsuario, (req, res) => {
    let resultado = peli.listarPeliculasActivas(req.params.numPage, 6);
    resultado.then(peliculas => {
        let totalPeliculas = peli.contarPeliculas();
        totalPeliculas.then(total => {
            res.render("index.ejs", { 
                titulo: "Index EJS",
                peliculas: peliculas,
                totalPeliculas: total[0].totalPelis
            });
        })
    }).catch(err => {
        res.status(400).json(err);
    })
});

//GET de añadir pelicula. Muestra el formulario para añadir una película nueva
ruta.get('/add', verificarUsuario, (req, res) => {
    res.render("\peliculas\\add.ejs", { 
        titulo: "Añadir Película"
    });
});

/*
* index de películas por POST. Crea una película
*/
ruta.post('/', verificarUsuario, (req, res) => {
    let resultado = peli.crearPelicula(req.body, req.files);
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

//GET de ver una película
ruta.get('/ver/pelicula/:id', verificarUsuario, (req, res) => {
    //console.log('ver');
    let resultado = peli.verPelicula(req.params.id);
    resultado.then(pelicula => {
        let generosPelicula = pelicula.etiquetas;
        let generos = genero.generoPorPelicula(generosPelicula);
        let etiquetas = [];
        generos.then(gens =>{
            gens.forEach(gen => {
                etiquetas.push(gen.nombre);
            });
            res.render("\peliculas\\verPelicula.ejs", { 
                titulo: "Index EJS",
                pelicula: pelicula,
                etiquetas: etiquetas
            });
        })
    }).catch(err => {
        res.status(400).json(err);
    })
});

//GET de editar una película
ruta.get('/editar/pelicula/:id', verificarUsuario, (req, res) => {
    let resultado = peli.verPelicula(req.params.id);
    resultado.then(pelicula => {
        let generosPelicula = pelicula.etiquetas;
        let generos = genero.generoPorPelicula(generosPelicula);
        let etiquetas = [];
        generos.then(gens =>{
            gens.forEach(gen => {
                etiquetas.push(gen.nombre);
            });
            let TodosLosGeneros = genero.getGeneros();
            TodosLosGeneros.then(listaGeneros => {
                res.render("\peliculas\\editarPelicula.ejs", { 
                    put: true,
                    titulo: "Index EJS",
                    pelicula: pelicula,
                    etiquetas: etiquetas,
                    listaGeneros: listaGeneros
                });
            })
        })
    }).catch(err => {
        res.status(400).json(err);
    })
});

/* ACTUALIZAR PELICULA */
ruta.post('/editar/pelicula/:id', (req, res) => {
    let resultado = peli.actualizarPelicula(req.params.id, req.body, req.files);
    resultado.then(pelicula => {
        let generosPelicula = pelicula.etiquetas;
        let generos = genero.generoPorPelicula(generosPelicula);
        let etiquetas = [];
        generos.then(gens =>{
            gens.forEach(gen => {
                etiquetas.push(gen.nombre);
            });
            res.render("\peliculas\\verPelicula.ejs", { 
                titulo: "Index EJS",
                pelicula: pelicula,
                etiquetas: etiquetas
            });
        })
    }).catch(err => {
        res.status(400).json({
            status: false
        })
    })
})

ruta.post('/delete/pelicula/:id', (req, res) => {
    let resultado = peli.desactivarPelicula(req.params.id);
    resultado.then(pelicula => {
        res.redirect('/api/peliculas/');
    }).catch(err => {
        res.status(400).json(err);
    })
})




module.exports = ruta;