require("./bootstrap");
require("./add");
require("./sponsor");
//require("./apt");
var $ = require("jquery");
const Handlebars = require("handlebars");
const { Alert } = require("bootstrap");

$(document).ready(function() {
    $(".nav__user-box").click(function() {
        $(".nav__user__menu").toggleClass("active");
        getcards();
    });
    $(".nav__search-button").click(function() {
        $('#hidenav').hide()
        hidenav();
    });
});

// animation
function hidenav() {
    
    $("nav__search-icon-big").addClass("active-flex");
    $(".nav__search-city").addClass("active-flex");
    $(".nav__search-date-start").addClass("active-flex");
    $(".nav__search-date-end").addClass("active-flex");
    $(".nav__search").addClass("nav__search-large");
    $(".nav__search-button").addClass("nav__search-button-large");
    $(".nav__search-icon-big").addClass("active-flex");
    $("#start-search").addClass("hidden");
}
$(window).bind("mousewheel", function (event) {
    $('#hidenav').show();
    $("nav__search-icon-big").removeClass("active-flex");
    $(".nav__search-city").removeClass("active-flex");
    $(".nav__search-date-start").removeClass("active-flex");
    $(".nav__search-date-end").removeClass("active-flex");
    $(".nav__search").removeClass("nav__search-large");
    $(".nav__search-button").removeClass("nav__search-button-large");
    $(".nav__search-icon-big").removeClass("active-flex");
    $("#start-search").removeClass("hidden");
});

// range value
var slider = (function (){
var slider = document.getElementById("myRanges");
var output = document.getElementById("range-value");

output.innerHTML = slider.value;

slider.oninput = function(){
    output.innerHTML = this.value;
}
/// slider da 20 a cento con sfondo custom
function rangeslider(){
    $('#range-hidden').val($('#range-value').html());
    var range = (slider.value - 20) * 1.25;
    var color = 'linear-gradient(90deg, rgb(230, 30, 77)' + range + '%, rgb(214,214,214)' + range + '%)';
    slider.style.background = color; 
}

slider.addEventListener("mousemove", function(){
    rangeslider();
});
slider.addEventListener("touchmove", function(){
    rangeslider();
});
///////////////////////////////////////////////////
})();
// chiamta che prende ip dell'utente e capisce la regione per ricerca nei paraggi
var getIp = (function(){
$.ajax({
    mehtod:'GET',
    url:'https://api.ipdata.co',
    data:{
        'api-key':'b9bcf03b37c7c5b52f5297af16c2acf07e72d596a1cb8257ed1add0c',
    },
    success:function(risposta){
       $('#ip-home-search').val(risposta.region);
    },
    error: function(){
        console.log(arguments);
    }

})
})();


