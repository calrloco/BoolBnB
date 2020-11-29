// ** FUNZIONI **/
$('.arrow-slider-sx').click(function(){
    prevImage();
 });

 $('.arrow-slider-dx').click(function(){
     nextImage();
 });


function nextImage(){
    var activeImage =$('.apt-image.active');
    activeImage.removeClass('active');
    activeImage.addClass('hidden');
   
    if (activeImage.hasClass('last') == true) {
        $('.apt-image.first').removeClass('hidden');
        $('.apt-image.first').addClass('active');
    } else {
       // metto la classe attiva al successivo
        activeImage.next().removeClass('hidden');
        activeImage.next().addClass('active');
    }
}

function prevImage(){
    var activeImage =$('.apt-image.active');
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