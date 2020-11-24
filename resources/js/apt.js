

$('.arrow-slider-sx').click(function(){
    prevImage($('.apt-image.active'));
});

$('.arrow-slider-dx').click(function(){
    nextImage(('.apt-image.active'));
});

//** FUNZIONI **/
function nextImage(){
    
    activeImage.removeClass('active');
    activeImage.addClass('hidden');
    
    if (activeImage.hasClass('last') == true) {
        activeImage.first().removeClass('hidden');
        activeImage.first().addClass('active');
    } else {
        //metto la classe attiva al successivo
        activeImage.next().removeClass('hidden');
        activeImage.next().addClass('active');
    }
}

function prevImage(){
   
    activeImage.removeClass('active');
    activeImage.addClass('hidden');

    if (activeImage.hasClass('first') == true) {
        activeImage.last().removeClass('hidden');
        activeImage.last().addClass('active');
    } else {
        //metto la classe attiva al successivo
        activeImage.prev().removeClass('hidden');
        activeImage.prev().addClass('active');
    }
}
