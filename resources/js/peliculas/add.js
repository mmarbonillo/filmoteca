
function addPelicula(){
    var formData = new FormData($("#formulario")[0]);
    $.ajax({
    url: '/api/peliculas',
    type: 'POST',
    data: {
        formData
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