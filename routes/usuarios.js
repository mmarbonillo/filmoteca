const express = require('express');
const Usuarios = require('../models/usuarioModel');
const Usuario = require('../controllers/usuariosController');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const verificarUsuario = require('../middlewares/auth');
const ruta = express.Router();

const user = new Usuario();

/* VALIDACIONES DE DATOS */
const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(10)
        .required(),

    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$_!%*?&])([A-Za-z\d$@$_!%*?&]|[^ ]){8,15}$/) //Expresión regular sacada de internet. Yo ya no me acuerdo como se hacen
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'es'] } })
        .required()
});

ruta.get('/', verificarUsuario, (req, res) => {
    let resultado = user.recogerUsuarioLogin(req);
    resultado.then(usuario => {
        res.render("\prueba\\index.ejs", { 
            titulo: "Usuario",
            usuario: usuario
        });
    })
    
});

ruta.post('/', (req, res) => {
    let resultado = user.addUsuario(req.body);
    resultado.then(usuario => {
        res.render("\auth\\confirmarAdd.ejs", { 
            titulo: "Usuario añadido correctamente"
        });
    }).catch(err => {
        console.log(err);
    })
});

ruta.get('/editar/:id', verificarUsuario, (req, res) => {
    let resultado = user.getUsuario(req.params.id);
    resultado.then(usuario => {
        res.render("\prueba\\editar.ejs", { 
            titulo: "Usuario",
            usuario: usuario
        });
    })
});
 
ruta.post('/update/:id', verificarUsuario, (req, res) => {
    let resultado = user.actualizarUsuario(req.params.id, req.body);
    resultado.then(usuario => {
        res.render("\prueba\\index.ejs", { 
            titulo: "Usuario",
            usuario: usuario
        });
    })
    
});

ruta.get('/modificarPass/:id', verificarUsuario, (req, res) => {
    let resultado = user.getUsuario(req.params.id);
    resultado.then(usuario => {
        res.render("\prueba\\modificarPass.ejs", { 
            titulo: "Usuario",
            usuario: usuario
        });
    })
});

ruta.post('/update/pass/:id', verificarUsuario, (req, res) => {
    let resultado = user.modificarContraseña(req.params.id, req.body.passNueva);
    resultado.then(usuario => {
        res.render("\prueba\\index.ejs", { 
            titulo: "Usuario",
            usuario: usuario
        });
    })
    
});

async function desactivarUsuario(email){
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set: {
            estado: false
        }
    }, {new: true});
    return usuario;
}

module.exports = ruta;