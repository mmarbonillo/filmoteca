
const mongoose = require('mongoose');
const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const express = require('express');
const Joi = require('@hapi/joi');
const app = express();

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

class Usuarios {

    constructor(){}
//{ $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] }
    comprobarUsuarioExiste(email, nombreUsuario){
        let usuario = Usuario.find({ $or: [{ 'email': email}, {'nombreUsuario': nombreUsuario }] });
        return usuario;
    }

    comprobarPass(email, password){
        let usuario = Usuario.find({ 'email': email});
        return usuario;
    }

    addUsuario(body){
        const {error, value} = schema.validate({
            nombre: body.userName,
            email: body.email,
            password: body.password
        });
        let usuario = new Usuario({
            email           : body.email,
            nombreUsuario   : body.userName,
            password        : bcrypt.hashSync(body.password, 10) //encriptar password
        });
        let resultado = usuario.save();
        //console.log(resultado);
        return resultado;
    }

    getUsuario(email){
        let usuario = Usuario.find({ 'email': email });
        return usuario;
    }

    listarUsuarioActivos(){
        let usuarios = Usuario.find({"estado": true});
        return usuarios;
    }
    
}

module.exports = Usuarios;

