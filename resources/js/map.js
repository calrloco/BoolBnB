require("./bootstrap");
var $ = require("jquery");
const Handlebars = require("handlebars");
const { log } = require("handlebars");
const { find } = require("lodash");

const APPLICATION_NAME = "My Application";
const APPLICATION_VERSION = "1.0";
tt.setProductInfo(APPLICATION_NAME, APPLICATION_VERSION);
const apiKey = "31kN4urrGHUYoJ4IOWdAiEzMJJKQpfVk";
let map = tt.map({
    key: apiKey,
    container: "map",
    center: [12.49334, 41.88996],
    style: "tomtom://vector/1/basic-main",
    zoom: 10
});
$(document).ready(function() {
    var instantSearch = (function() {
        getCoordinates($("#address-inst").html());
        getServices();
    })();
    $(".nav__search-icon-big").click(function() {
        $(".search__resoults__apartment-cards").empty();
        console.log($("#search").val());
        getCoordinates($("#search").val());
    });
});
//// prendi coordinate dell'input////////////////
function getCoordinates(input) {
    tt.services
        .fuzzySearch({
            key: "31kN4urrGHUYoJ4IOWdAiEzMJJKQpfVk",
            query: input
        })
        .go()
        .then(function(response) {
            var longitude = response.results[0].position["lng"];
            var latitude = response.results[0].position["lat"];
            console.log(response);
            getCards(latitude, longitude);
        });
}

/////////// chiamata all nostro db che richiama funzione handlebars
function getServices() {
    $.ajax({
        url: "http://127.0.0.1:8000/api/services/all",
        headers: {
            KEY: "test"
        },
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                var service = `<p data-servicetype="${response[i].id}" class="services-all">${response[i].service}</p>`;
                $(".services").append(service);
            }
        },
        error: function() {
            console.log(arguments);
        }
    });
}

function getCards(lat, lng) {
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
            console.log(risposta);
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
    const markersCity = [];
    for (var i = 0; i < risp.length; i++) {
        var context = {
            city: risp[i].city,
            title: troncaStringa(risp[i].title),
            id: `<input class="aps_id" type="" name="apartment_id" value=${risp[i].id}>`
        };

        var coordinates = [risp[i].longitude, risp[i].latitude];
        var address = risp[i].address;
        var city = risp[i].city;
        // creo il custom marker
        var element = document.createElement("div");
        element.id = "marker";
        const marker = new tt.Marker({ element: element })
            .setLngLat(coordinates)
            .setPopup(new tt.Popup({ offset: 35 }).setHTML(address))
            .addTo(map);

        markersCity[i] = { marker, city };
        console.log(markersCity[i]);

        var popupOffsets = {
            top: [0, 0],
            bottom: [0, -70],
            "bottom-right": [0, -70],
            "bottom-left": [0, -70],
            left: [25, -35],
            right: [-25, -35]
        };

        // popup sui marker standard
        var popup = new tt.Popup({
            offset: popupOffsets
        }).setHTML(address + " " + city + " " + "<br>" + "price" + "€");

        // marker.setPopup(popup).togglePopup();

        var htmlContext = templateCards(context);
        $(".search__resoults__apartment-cards").append(htmlContext);

        var el = $(".search__resoults__apartment-cards-content");
        appendServices(risp[i].id);
        console.log(el);
        // cliccando su un elemento della store-list lo trova in mappa
        el.on(
            "click",
            (function(marker) {
                console.log(marker.getLngLat());
                const activeItem = $(this);
                return function() {
                    map.easeTo({
                        center: marker.getLngLat(),
                        zoom: 16
                    });
                    closeAllPopups();
                    marker.togglePopup();
                };
            })(marker)
        );
    }
}
/// appende i servizi all'appartamento
function appendServices(id) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/services",
        headers: {
            KEY: "test"
        },
        data: {
            id: id
        },
        success: function(response) {
            var dataAttr = [];
            for (var i = 0; i < response.length; i++) {
                dataAttr.push(response[i].service_id);
                $(".search__resoults__apartment-cards-content").each(
                    function() {
                        if (
                            $(this)
                                .find($(".aps_id"))
                                .val() == response[i].apartment_id
                        ) {
                            $(this).attr("data-service", dataAttr);
                        }
                    }
                );
            }
        },
        error: function() {}
    });
}
/// appendere le immagini allo slider
function getImages(id){
    $.ajax({

    })
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
        shortText = "Descrizione non disponibile";
    }
    return shortText;
}

/// filtra ricerca per servizi
$(document).on('click','.services-all',function(){
  var serviceType = $(this).data('servicetype').toString();
  $('.search__resoults__apartment-cards-content').each(function(){
    var serviceHome = $(this).data('service');
    if(serviceHome.includes(serviceType)){
        $(this).show();
    }else{
        $(this).hide();
    }
  });
});
