

$('.arrow-slider-sx').click(function(){
    prevImage();
});

$('.arrow-slider-dx').click(function(){
    nextImage();
});

//** FUNZIONI **/

function nextImage(){
    //memorizzo in una var l'immagine attiva
    var activeImage = $('.apt-image.active');

    //tolgo la classe attiva e metto classe hidden
    activeImage.removeClass('active');
    activeImage.addClass('hidden');

    if (activeImage.hasClass('last') == true) {
        $('.apt-image.first').removeClass('hidden');
        $('.apt-image.first').addClass('active');
    } else {
        //metto la classe attiva al successivo
        activeImage.next().removeClass('hidden');
        activeImage.next().addClass('active');
    }
}

function prevImage(){
    //memorizzo in una var l'immagine attiva
    var activeImage = $('.apt-image.active');

    //tolgo la classe attiva e metto classe hidden
    activeImage.removeClass('active');
    activeImage.addClass('hidden');

    if (activeImage.hasClass('first') == true) {
        $('.apt-image.last').removeClass('hidden');
        $('.apt-image.last').addClass('active');
    } else {
        //metto la classe attiva al successivo
        activeImage.prev().removeClass('hidden');
        activeImage.prev().addClass('active');
    }
}


// //recupero i valori dal for nel DOM
// var recovered_images = $('#check-info-img').val();
// console.log(recovered_images);
//
// //trasformo la stringa con tutte le img in un array di oggetti
// var images = JSON.parse(recovered_images);
// console.log(images);
//
// //inizializzo la variabile indice e imposto la prima img
// var i = 0;
// $('.apt-img-slider').attr('src', images[i].path);
//
// //al click a sx decremento l'indice spostandomi nell'arrray sull'img precedente.
// //se l'indice arriva a zero riparte dall'ultima img.
// $(".arrow-slider-sx").on('click', function(){
//     if(i > 0){
//         i--;
//         // console.log(i);
//         $('.apt-img-slider').attr('src', images[i].path);
//     } else {
//         i = images.length-1;
//         $('.apt-img-slider').attr('src', images[i].path);
//     }
// });
//
// //al click a dx incremento l'indice spostandomi nell'arrray sull'img successiva.
// //se l'indice arriva a zero riparte dall'ultima img.
// $(".arrow-slider-dx").on('click', function(){
//     if(i < images.length-1){
//         i++;
//         // console.log(i);
//         $('.apt-img-slider').attr('src', images[i].path);
//     } else {
//         i = 0;
//         $('.apt-img-slider').attr('src', images[i].path);
//     }
// });
