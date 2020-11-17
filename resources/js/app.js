require("./bootstrap");
var $ = require("jquery");
const Handlebars = require("handlebars");


const APPLICATION_NAME = 'My Application';
const APPLICATION_VERSION = '1.0';
tt.setProductInfo(APPLICATION_NAME, APPLICATION_VERSION);
const apiKey = '31kN4urrGHUYoJ4IOWdAiEzMJJKQpfVk';
let map = tt.map({
    key: apiKey,
    container: 'map',
    center: [12.49334, 41.88996],
    style: 'tomtom://vector/1/basic-main',
    zoom: 10
});




$(document).ready(function() {

    var instantSearch = (function(){
        
        getCoordinates($('#address-inst').html());
    })();

    $('.nav__search-icon-big').click(function(){
        $(".search__resoults__apartment-cards").empty();
        console.log($('#search').val());
        getCoordinates($('#search').val());
    })
    
    
    
    
    $(".nav__user-box").click(function() {
        
        $(".nav__user__menu").toggleClass("active");
        getcards();
    });
    
    $("#hidenav").click(function() {
        $(this).hide();
        hidenav();
    });
});
//// prendi coordinate dell'input////////////////
function getCoordinates(input) {
    
    tt.services.fuzzySearch({
            key: '31kN4urrGHUYoJ4IOWdAiEzMJJKQpfVk',
            query:input
        }).go().then(function(response) {
            var longitude = response.results[0].position['lng'];
            var latitude = response.results[0].position['lat'];
            console.log(response);
            getCards(latitude,longitude);
        });
}
/////////// chiamata all nostro db che richiama funzione handlebars
function getCards(lat,lng) {
    
    $.ajax({
        url: "http://127.0.0.1:8000/api/apartments",
        method: "GET",
        headers: {
            KEY: "test"
        },
        data: {
            lat: lat,
            lng: lng,
            maxDist: 1000
        },
        success: function(risposta) {
            compileHandlebars(risposta);
        },
        error: function() {
            console.log("error");
        }
    });
}
////////////////////////////////////
/// funziione per inserire le card della ricerca nel dom
function compileHandlebars(risp) {
    var source = $("#handlebars_cards").html();
    var templateCards = Handlebars.compile(source);
    for (var i = 0; i < risp.length; i++) {
        var context = {
            city: risp[i].city,
            title: troncaStringa(risp[i].title),
            id: `<input type="hidden" name="apartment_id" value=${risp[i].apartment_id}>`,
            img: risp[i].path
        };
        var htmlContext = templateCards(context);
        $(".search__resoults__apartment-cards").append(htmlContext);
    }
}
// funzione per troncare una stringa
function troncaStringa(stringa) {
    var shortText = "";
    if (stringa.length != 0) {
        for (var i = 0; i < stringa.length; i++) {
            if (stringa[i] == " " && i < 250) {
                var shortText = $.trim(stringa).substring(0, i) + "...";
            }
        }
    } else {
        shortText = "Trama Non Disponibile";
    }
    return shortText;
}
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
