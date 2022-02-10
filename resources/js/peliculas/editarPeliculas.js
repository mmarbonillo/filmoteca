//ANIMACIÓN DE LAS ESTRELLAS
$(".estrellaEdit").on({
    mouseenter: function(){
        var numClase = parseInt($(this).attr('alt'));
        for(var i = numClase; i >= 1; i--){
            $('img[alt="'+i+'"]').attr('src', '/img/estrellaAmarilla.svg');
            $('img[alt="'+i+'"]').removeClass('estrellaBlanca');
            $('img[alt="'+i+'"]').addClass('estrellaAmarilla');
        }
        for(var x = (numClase+1) ; x <= 5; x++){
            $('img[alt="'+x+'"]').attr('src', '/img/estrellaBlanca.svg');
            $('img[alt="'+x+'"]').removeClass('estrellaAmarilla');
            $('img[alt="'+x+'"]').addClass('estrellaBlanca');
        }
    },
    click: function (){
        var valorNuevo = $(this).attr('alt');
        $('input[name="valorValoracion"]').val(valorNuevo);
    },
    mouseleave: function() {
        var valorActual = parseInt($('input[name="valorValoracion"]').val());
        for(var i = valorActual; i >= 1; i--){
            $('img[alt="'+i+'"]').attr('src', '/img/estrellaAmarilla.svg');
            $('img[alt="'+i+'"]').removeClass('estrellaBlanca');
            $('img[alt="'+i+'"]').addClass('estrellaAmarilla');
        }
        for(var x = (valorActual+1) ; x <= 5; x++){
            $('img[alt="'+x+'"]').attr('src', '/img/estrellaBlanca.svg');
            $('img[alt="'+x+'"]').removeClass('estrellaAmarilla');
            $('img[alt="'+x+'"]').addClass('estrellaBlanca');
        }
    }
});