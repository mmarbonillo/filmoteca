
function validarUsuarioNuevo(){
    $.ajax({
        url: '/api/login/validar',
        type: 'POST',
        data: {
        'nombreUsuario': $('#userName').val(),
        'email': $('#email').val(),
        'password': $('#password').val(),
        'passwordConfirm': $('#passwordConfirm').val()
    },
    success:function(result){
        if(!result){
            alert("Error en la validación de datos");
        }else{
            $('#submitAñadir').click();
        }
    },
    error:function(err) {
        alert('error ajax');
    }
    });
}

function comprobarPassword(email, pass){
    $.ajax({
        url: '/api/login/comprobarPass',
        type: 'POST',
        data: {
        'email': email,
        'password': pass
    },
    success:function(result){
        //console.log(result);
        if(!result){
            alert('Usuario o contraseña incorrectos');
        }else{
            $(location).attr('href', '/api/peliculas');
        }
    },
    error:function(err) {
        //alert('error ajax');
    }
    });
}

function comprobarUsuarioNuevo(){
    $.ajax({
        url: '/api/login/comprobar',
        type: 'POST',
        data: {
        'nombreUsuario': $('#userName').val(),
        'email': $('#email').val(),
    },
    success:function(result){
        if(result[0] == undefined){
            validarUsuarioNuevo();
        }else {
            alert('El usuario ya existe');
        }
    },
    error:function(err) {
        //alert('error ajax');
    }
    });
}

function comprobarUsuario(){
    $.ajax({
        url: '/api/login/comprobar',
        type: 'POST',
        data: {
        'email': $('#emailLogin').val(),
        'nombreUsuario': ""
    },
    success:function(result){
        if(result[0] != undefined){
            comprobarPassword($('#emailLogin').val(), $('#passwordLogin').val());
        }else{
            alert('El usuario no existe');
        }
    },
    error:function(err) {
        //alert('error ajax');
    }
    });
}