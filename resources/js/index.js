
const totalPeliculas = parseInt($("#totalPeliculas").val());

function siguiente(){
    var pathname = $(location).attr('pathname').split('/');
    //alert(pathname.length);
    if(pathname.length == 3){ //Si la longitud es 3, significa que estoy en la pçagina principal
        $(location).attr('href', ('/api/peliculas/' + 7 + '/' + 6));
    }else{
        var inicio = parseInt(pathname[3]);
        var numPelis = parseInt(pathname[4]);
        //alert("TOTAL: " + totalPeliculas);
        //alert("inicio: " + inicio);
        if(totalPeliculas != inicio){
            $(location).attr('href', ('/api/peliculas/' + (inicio + 6) + '/' + numPelis));
        }
    }
}

function anterior(){
    var pathname = $(location).attr('pathname').split('/');
    var inicio = parseInt(pathname[3]);
    var numPelis = parseInt(pathname[4]);
    console.log("Inicio -> " + inicio);
    console.log("NumPelis -> " + numPelis);
    //alert(pathname.length);
    if((inicio != 1 || isNaN(inicio)) && pathname.length > 3){ 
        $(location).attr('href', ('/api/peliculas/' + (inicio - 6) + '/' + numPelis));
    }
}

function pagFinal(){
    $(location).attr('href', ('/api/peliculas/' + totalPeliculas + '/' + 6));
}
