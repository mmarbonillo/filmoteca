
function addPelicula(){
    $.ajax({
    url: '/api/peliculas',
    type: 'POST',
    data: {
        //"_token": token,
        "titulo": $("#titulo").val(),
        "anyo": $("#anyo").val(),
        "valoracion": $("#valoracion").val(),
        "etiquetas": $("#etiquetas").val(),
        "descripcion": $("#descripcion").val(),
        "imagen": $("#imagen").attr("src")
    },
    success:function(result){
        if(result["status"]){
            alert("Película añadida");
        }
    }
    });
}

function index(){
    $(location).attr('href', '/api/peliculas');
}