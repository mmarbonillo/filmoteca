const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const config = require('config');



let verificarUsuario = (req, res, next) => {
    if(req.headers.cookie != undefined){
        var token = (req.headers.cookie).split('=')[1];
        jwt.verify(token, config.get('configToken.SEED'), (err, decoded) => {
            if(!err){
                next();
            } else {
                return false;
            }
        })
    }else{
        res.redirect('/api/login');
    }
}

module.exports = verificarUsuario;