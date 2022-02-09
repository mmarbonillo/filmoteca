const express = require('express');
const Usuarios = require('../models/usuarioModel');
const Usuario = require('../controllers/usuariosController');
const bcrypt = require('bcrypt');
const config = require('config');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const { json } = require('express');
const ruta = express.Router();
const app = express();
app.use(cookieParser())

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
        res.send(datos);
    })
});

/**
 * COMPROBAR LA CONTRASEÑA PARA HACER EL LOGIN
 */
ruta.post('/comprobarPass', (req, res) => {
    let resultado = user.comprobarPass(req.body.email, req.body.password);
    resultado.then(datos => {
        let compara = bcrypt.compareSync(req.body.password, datos[0].password);
        if(compara){
            let usuario = datos[0];
            const jwToken = jwt.sign({
                usuario: {_id: usuario._id, nombre: usuario.nombreUsuario, email: usuario.email}
                }, config.get('configToken.SEED'), { expiresIn: config.get('configToken.expiration') });
            res.cookie('jwToken', jwToken).send(jwToken);
        }else{
            res.send(false);
        }
    })
});

/**
 * VALIDAR DATOS CON EL SCHEMA Y COMPROBAR QUE LAS CONTRASEÑAS COINCIDEN
 */
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

/**
 * PÁGINA DE LOGIN
 */
ruta.get('/', (req, res) => {
    res.render("\auth\\login.ejs", { 
        titulo: "Index EJS"
    });
});

/**
 * MODIFICAR CONTRASEÑA -> COMPROBAR QUE LA CONTRASEÑA INTRODUCIDA COINCIDE CON LA ACTUAL PARA DEJARLE ACTUALIZAR LA
 */
ruta.post('/comprobarPassActual', (req, res) => {
    let resultado = user.getUsuario(req.body.id);
    resultado.then(datos => {
        let compara = bcrypt.compareSync(req.body.password, datos.password);
        if(compara){
            let usuario = datos;
            const jwToken = jwt.sign({
                usuario: {_id: usuario._id, nombre: usuario.nombreUsuario, email: usuario.email}
                }, config.get('configToken.SEED'), { expiresIn: config.get('configToken.expiration') });
            res.send(true)
        }else{
            res.send(false);
        }
    })
});


module.exports = ruta;