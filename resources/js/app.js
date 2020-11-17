require("./bootstrap");
require("./add");
var $ = require("jquery");
const Handlebars = require("handlebars");

$(document).ready(function() {
    $(".nav__user-box").click(function() {
        $(".nav__user__menu").toggleClass("active");
    });
    var getCards = (function() {
        $.ajax({
            url: "http://127.0.0.1:8000/api/apartments",
            method: "GET",
            headers: {
                KEY: "test"
            },
            data: {
                lat: 41.94989,
                lng: 12.53509,
                maxDist: 20
            },
            success: function(risposta) {
                console.log(risposta);
                compileHandlebars(risposta);
            },
            error: function() {
                console.log("error");
            }
        });
    });
    $("#hidenav").click(function() {
        $(this).hide();
        hidenav();
    });
});

/// funziione per inserire le card della ricerca nel dom
function compileHandlebars(risp) {
    var source = $("#handlebars_cards").html();
    var templateCards = Handlebars.compile(source);
    for (var i = 0; i < risp.length; i++) {
        var context = {
            city: risp[i].city,
            title: troncaStringa(risp[i].title),
            id: `<input type="hidden" name="apartment_id" value=${risp[i].apartment_id}>`,
            img:risp[i].path
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
