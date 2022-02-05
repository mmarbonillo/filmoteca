const express = require('express');
const Usuarios = require('../models/usuarioModel');
const Usuario = require('../controllers/usuariosController');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const { json } = require('express');
const ruta = express.Router();

const user = new Usuario();

/* VALIDACIONES DE DATOS */
const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(10)
        .required(),

    password: Joi.string()
        //Min 8 Max 15 1 Mayus 1 Minus 1 Num Sin espacios 1 carácter especial
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$_!%*?&])([A-Za-z\d$@$_!%*?&]|[^ ]){8,15}$/) //Expresión regular sacada de internet. Yo ya no me acuerdo como se hacen
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'es'] } })
        .required()
});


/**
 * COMPROBAR QUE NO EXISTE EL USUARIO EN LA BBDD
 */
ruta.post('/comprobar', (req, res) => {
    let resultado = user.comprobarUsuarioExiste(req.body.email, req.body.nombreUsuario);
    resultado.then(datos => {
        console.log(datos);
        res.send(datos);
    })
});

ruta.post('/comprobarPass', (req, res) => {
    let resultado = user.comprobarPass(req.body.email, req.body.pass);
    resultado.then(datos => {
        console.log(datos);
        res.send(datos);
    })
});

ruta.post('/validar', (req, res) => {
    const {error, value} = schema.validate({
        nombre: req.body.nombreUsuario,
        email: req.body.email,
        password: req.body.password
    });
    if(!error){
        if(req.body.password == req.body.passwordConfirm)
            res.send(true);
        else
            res.send(false);
    }else{
        res.send(false);
    }
});

ruta.get('/', (req, res) => {
    res.render("\auth\\login.ejs", { 
        titulo: "Index EJS"
    });
})

module.exports = ruta;