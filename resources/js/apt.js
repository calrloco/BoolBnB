var i = 0;
var check = $('#check-info-img').val();

var images = JSON.parse(check);
console.log(images);

$('.apt-img-slider').attr('src', images[i].path);


$(".arrow-slider-sx").on('click', function(){
    if(i > 0){
        i--;
        // console.log(i);
        $('.apt-img-slider').attr('src', images[i].path);
    } else {
        i = images.length-1;
        $('.apt-img-slider').attr('src', images[i].path);
    }
});

$(".arrow-slider-dx").on('click', function(){
    if(i < images.length-1){
        i++;
        // console.log(i);
        $('.apt-img-slider').attr('src', images[i].path);
    } else {
        i = 0;
        $('.apt-img-slider').attr('src', images[i].path);
    }
});
