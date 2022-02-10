const usuarios = require('./routes/usuarios');
const peliculas = require('./routes/peliculas');
const login = require('./routes/auth');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

var util= require('util');
var encoder = new util.TextEncoder('utf-8');




//Conectarnos a la BD
mongoose.connect(config.get('configDB.HOST'), {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB..', err));


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '\\resources'));
console.log("dirname:" + __dirname);
app.use(fileUpload())
app.set("view engine", "ejs");
app.set("views, ./views");
app.set("resources/img, ./resources/img/");
app.use('/api/usuarios', usuarios);
app.use('/api/peliculas', peliculas);
app.use('/api/login', login);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Api RESTFul Ok, y ejecutándose...');
})