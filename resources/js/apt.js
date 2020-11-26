require("./bootstrap");
//require("./apt");
var $ = require("jquery");
const Handlebars = require("handlebars");
const {
    log
} = require("handlebars");
const {
    find
} = require("lodash");


// $('.arrow-slider-sx').click(function(){
//     prevImage($('.apt-image.active'));
// });

// $('.arrow-slider-dx').click(function(){
//     nextImage(('.apt-image.active'));
// });

// //** FUNZIONI **/
// function nextImage(){
    
//     activeImage.removeClass('active');
//     activeImage.addClass('hidden');
    
//     if (activeImage.hasClass('last') == true) {
//         activeImage.first().removeClass('hidden');
//         activeImage.first().addClass('active');
//     } else {
//         //metto la classe attiva al successivo
//         activeImage.next().removeClass('hidden');
//         activeImage.next().addClass('active');
//     }
// }

// function prevImage(){
   
//     activeImage.removeClass('active');
//     activeImage.addClass('hidden');

//     if (activeImage.hasClass('first') == true) {
//         activeImage.last().removeClass('hidden');
//         activeImage.last().addClass('active');
//     } else {
//         //metto la classe attiva al successivo
//         activeImage.prev().removeClass('hidden');
//         activeImage.prev().addClass('active');
//     }
// }
var getMap = (function(){
const APPLICATION_NAME = "My Application";
const APPLICATION_VERSION = "1.0";
tt.setProductInfo(APPLICATION_NAME, APPLICATION_VERSION);
const apiKey = "31kN4urrGHUYoJ4IOWdAiEzMJJKQpfVk";
let map = tt.map({
    key: apiKey,
    container: "map",
    center: [12.49334, 41.88996],
    style: "tomtom://vector/1/basic-main",
    zoom: 4
});
})();
$.ajax({
    url:'http://127.0.0.1:8000/api/apartments/'+$('#app-id').html(),
    headers: {
        KEY: 'test'
    },
    success: function(response){
        let map = tt.map({
            key: '31kN4urrGHUYoJ4IOWdAiEzMJJKQpfVk',
            container: "map",
            center: [ response[0].longitude,response[0].latitude],
            style: "tomtom://vector/1/basic-main",
            zoom: 16
        });
        var element = document.createElement("div");
        element.id = "marker";
        var coordinates = [response[0].longitude,response[0].latitude];
        const marker = new tt.Marker({ element: element })
            .setLngLat(coordinates)
            
            .addTo(map);

        var popupOffsets = {
            top: [0, 0],
            bottom: [0, -70],
            "bottom-right": [0, -70],
            "bottom-left": [0, -70],
            left: [25, -35],
            right: [-25, -35]
        };

        
    },error: function(){
        console.log(arguments);
    }
});
