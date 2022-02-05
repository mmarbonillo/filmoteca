const express = require('express');
const Pelicula = require('../models/peliculasModel');
const usuarioModel = require('../models/usuarioModel');
const Peliculas = require('../controllers/peliculasController');
const Etiqueta = require('../models/generosModel');
const Generos = require('../controllers/generosController');
const ruta = express.Router();

var peli = new Peliculas();
var genero = new Generos();
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

//const numeroPage = 2;
//const sizePage = 10;

//Index de películas. Lista las películas
ruta.get('/', (req, res) => {
    let resultado = peli.listarPeliculasActivas(1, 6);
    resultado.then(peliculas => {
        res.render("index.ejs", { 
            titulo: "Index EJS",
            peliculas: peliculas
        });
    }).catch(err => {
        res.status(400).json(err);
    })
});

/* index con paginacion */
ruta.get('/:numPage/:numFills', (req, res) => {
    let resultado = peli.listarPeliculasActivas(req.params.numPage, 6);
    resultado.then(peliculas => {
        res.render("index.ejs", { 
            titulo: "Index EJS",
            peliculas: peliculas
        });
    }).catch(err => {
        res.status(400).json(err);
    })
});

//GET de añadir pelicula. Muestra el formulario para añadir una película nueva
ruta.get('/add', (req, res) => {
    res.render("\peliculas\\add.ejs", { 
        titulo: "Añadir Película"
    });
});

/*
* index de películas por POST. Crea una película
*/
ruta.post('/', (req, res) => {
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
ruta.get('/ver/:id', (req, res) => {
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
ruta.get('/editar/:id', (req, res) => {
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
ruta.post('/editar/:id', (req, res) => {
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

ruta.post('/delete/:id', (req, res) => {
    let resultado = peli.desactivarPelicula(req.params.id);
    resultado.then(pelicula => {
        res.redirect('/api/peliculas/');
    }).catch(err => {
        res.status(400).json(err);
    })
})




module.exports = ruta;