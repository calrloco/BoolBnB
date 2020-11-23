require("./bootstrap");
var $ = require("jquery");
const Handlebars = require("handlebars");
const {
    log
} = require("handlebars");
const {
    find
} = require("lodash");

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
$(document).ready(function() {
    var instantSearch = (function() {
        if ($("#address-inst").html() != "") {
            getCoordinates($("#address-inst").html(), $("#range-form").html());
            getServices();
        }
    })();
    $(".nav__search-icon-big").click(function () {
        $(".search__resoults__apartment-cards").empty();
        getCoordinates($("#search").val(), $("#range-value").html());
    });
});
//// prendi coordinate dell'input////////////////
function getCoordinates(input, range) {
    var zoom = 10;
    if (input != '') {
        tt.services
            .fuzzySearch({
                key: apiKey,
                query: input,
            })
            .go()
            .then(function (response) {
                var longitude = response.results[0].position["lng"];
                var latitude = response.results[0].position["lat"];
                city = response.results[0].address['municipality'];
                streetName = response.results[0].address['streetName'];
                // condizione per selezionare lo zoom in caso di città o indirizzo specifico
                if (streetName != undefined && city) {
                    zoom = 16;
                } 
                map = tt.map({
                    key: apiKey,
                    style: 'tomtom://vector/1/basic-main',
                    container: 'map',
                    center: response.results[0].position,
                    zoom: zoom

                });

                getCards(latitude, longitude, range);
            });
    }
}

/////////// chiamata all nostro db che richiama funzione handlebars
function getServices() {
    $.ajax({
        url: "http://127.0.0.1:8000/api/services/all",
        method: "GET",
        headers: {
            KEY: "test"
        },
        success: function (response) {
            for (var i = 0; i < response.length; i++) {
                var service = `<button data-servicetype="${response[i].id}" class="services-all">${response[i].service}</button>`;
                $(".services").append(service);
            }
        },
        error: function () {
            console.log(arguments);
        }
    });
}

function getCards(lat, lng, maxDist) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/apartments",
        method: "GET",
        headers: {
            KEY: "test"
        },
        data: {
            lat: lat,
            lng: lng,
            maxDist: maxDist
        },
        success: function(risposta) {
            compileHandlebars(risposta);

        },
        error: function () {
            console.log("error");
        }
    });
}

////////////////////////////////////
/// funzione per inserire le card della ricerca nel dom e creare i marker associati nella mappa
function compileHandlebars(risp) {
    var source = $("#handlebars_cards").html();
    var templateCards = Handlebars.compile(source);
    const markersCity = [];
    for (let i = 0; i < risp.length; i++) {
        var context = {
            city: risp[i].city,
            title: troncaStringa(risp[i].title),
            id: `<input class="aps_id" type="hidden" name="apartment_id" value=${risp[i].id}>`
        };

        var coordinates = [risp[i].longitude, risp[i].latitude];
        var address = risp[i].address;
        var city = risp[i].city;
        var price = risp[i].daily_price;
        // creo il custom marker
        var element = document.createElement("div");
        element.id = "marker";
        const marker = new tt.Marker({ element: element })
            .setLngLat(coordinates)
            .setPopup(new tt.Popup({ offset: 35 }).setHTML(address))
            .addTo(map);

        var popupOffsets = {
            top: [0, 0],
            bottom: [0, -70],
            "bottom-right": [0, -70],
            "bottom-left": [0, -70],
            left: [25, -35],
            right: [-25, -35]
        };

        // popup sui marker
        var popup = new tt.Popup({
            offset: popupOffsets
        }).setHTML(
            address +
                " " +
                city +
                " " +
                "<br>" +
                "<strong>" +
                price +
                "</strong>" +
                " € a notte"
        );

        // assegno il popup
        marker.setPopup(popup);

        var htmlContext = templateCards(context);
        $(".search__resoults__apartment-cards").append(htmlContext);
        appendServices(risp[i].id);
        var el = $(".search__resoults__apartment-cards-content");
        var details = buildLocation(el, address);
        // cliccando su un elemento della lista a sx lo trova in mappa
        details.on(
            "click",
            (function(marker) {
                const activeItem = $(this);
                return function() {
                    map.easeTo({
                        center: marker.getLngLat(),
                        zoom: 16
                    });
                    // serve a passare da un marker all'altro nella selezione di sx
                    closeAllPopups();
                    // marker.togglePopup();
                }
            })(marker)
        );
            // console.log(details);
         console.log(address);
            
                 // console.log(marker._lngLat.lng);
                // console.log(marker._lngLat.lat);

        // cliccando sul marker aggiunge la classe selected alla card dell'appartamento corrispondente
        marker._element.addEventListener('click',
            (function () {
                var posizione = $(this).index() - 1;
                details.removeClass('selected');
                details.eq(posizione).addClass('selected');
            })
        );
        console.log(marker);

          
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
        success: function (response) {
            var dataAttr = [];
            for (var i = 0; i < response.length; i++) {
                dataAttr.push(response[i].service_id);
                $(".search__resoults__apartment-cards-content").each(
                    function () {
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
        error: function () {}
    });
}
/// appendere le immagini allo slider
function getImages(id) {
    $.ajax({});
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
var serviceCheck = (function() {
    var selectedService = [];
    
    $(document).on("click", ".services-all", function() {
        var serviceType = $(this)
            .data("servicetype")
            .toString();
        $(this).toggleClass("service-selected");
        if(selectedService.length < $('.services-all').length && !selectedService.includes(serviceType)){
            selectedService.push(serviceType);
        }
        if(!$(this).hasClass("service-selected")){
             selectedService = selectedService.filter(function(item){
                   return item !== serviceType;
             })
        }
       
        $(this).toggleClass(".service-selected");
        $(".search__resoults__apartment-cards-content").each(function() {
            var serviceHome = $(this).data("service").toString();
            var servicesCasa = serviceHome.split(",");
            console.log(servicesCasa); 
            console.log(selectedService);
            if(selectedService.length === 0 ){
                $(this).show();
                $('.mapboxgl-marker').show();
            }else if(servicesCasa.length > selectedService.length && serviceHome.includes(selectedService.toString())){
                 $(this).show();
                 $('.mapboxgl-marker').eq($(this).index()).show();
            }else if (same(servicesCasa,selectedService)) {
                $(this).show();
                $('.mapboxgl-marker').eq($(this).index()).show();
            } else {
                $(this).hide();
                $('.mapboxgl-marker').eq($(this).index()).hide();
            }
        });
    });
})();

// al keyup si attiva funzione per l'autocompletamento della search che richiama l'API tomtom
$("#search").keyup(function () {
    $('#auto-complete').empty();
    autoComplete($("#search").val());
});

//funzione per selezionare suggerimento e restuirlo nella search
$(document).on('click', '.complete-results', function () {
    var value = $(this).text();
    $('#search').val(value);
    getCoordinates($("#search").val());
    $('#auto-complete').removeClass('active');

});

// funzione per i suggerimenti nella search
function autoComplete(query) {
    if (query < 3 || query == '') {
        $('#auto-complete').removeClass('active');
    }
    if (query != '' && isNaN(query) && query.length > 3) {
        $('#auto-complete').addClass('active');
        tt.services.fuzzySearch({
                key: apiKey,
                query: query,
            })
            .go()
            .then(function (response) {

                var address = [];
                var results = '';

                for (let i = 0; i < 4; i++) {
                    if (response.results[i]) {
                        // nel ciclo pusho i risulti in un array e controllo che non ci siano ripetizioni                
                        var streetName = response.results[i].address['streetName'];
                        var city = response.results[i].address['municipality'];
                        var countryCode = response.results[i].address['countryCode'];
                        if (streetName != undefined && !address.includes(streetName) && city != undefined && !address.includes(city) && countryCode == 'IT') {
                            address.push(streetName + ' ' + city);
                        } else if (streetName == undefined && city != undefined && !address.includes(city) && countryCode == 'IT') {
                            address.push(city);
                        }
                    }
                }
                for (let i = 0; i < address.length; i++) {
                    results += '<div class="complete-results">' + address[i] + '</div>'

                }
                document.getElementById('auto-complete').innerHTML = results;
                if (results == '') {
                    $('#auto-complete').removeClass('active');
                }
            });

    }
}

//funzione che associa l'address con la card apartment nel DOM
function buildLocation(el, text) {
    const details = el;
    details.innerHTML = text;
    // details["position"] = xy;
    return details;
}

// compare arrays:
function same(arr1, arr2) {
    if($(arr1).not(arr2).length === 0 && $(arr2).not(arr1).length === 0){
        return true
    }
     return false;
    
}
