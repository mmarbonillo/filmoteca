const usuarios = require('./routes/usuarios');
const peliculas = require('./routes/peliculas');
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');




//Conectarnos a la BD
mongoose.connect('mongodb://localhost:27017/filmoteca', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '\\resources'));
console.log("dirname:" + __dirname);
app.use(fileUpload())
console.log(__dirname + '\\resources');
app.set("view engine", "ejs");
app.set("views, ./views");
app.set("resources/img, ./resources/img/");
app.use('/api/usuarios', usuarios);
app.use('/api/peliculas', peliculas);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Api RESTFul Ok, y ejecutándose...');
})