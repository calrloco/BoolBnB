require("./bootstrap");
//require("./apt");
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
    zoom: 4
});
$(document).ready(function() {
    var instantSearch = (function() {
        if ($("#address-inst").html() != "") {
            getCoordinates(
                $("#address-inst").html(),
                $("#range-form").html(),
                false
            );
            getServices();
        }
    })();

    $(".nav__search-icon-big").click(function() {
        $(".search__resoults__apartment-cards").empty();
        $('#address-inst').text($("#search").val());
        if ($("#search").val() != "") {
            getCoordinates($("#search").val(), $("#range-value").html(), false);
        }
    });

    $("#search").keydown(function() {
        if (event.which == 13 || event.keyCode == 13) {
            if ($("#search").val() != "") {
                getCoordinates(
                    $("#search").val(),
                    $("#range-value").html(),
                    false
                );
            }
        }
    });
});
//// prendi coordinate dell'input////////////////
function getCoordinates(input, range, services) {
    var zoom = 10;
    if (input != "") {
        tt.services
            .fuzzySearch({
                key: apiKey,
                query: input
            })
            .go()
            .then(function(response) {
                var longitude = response.results[0].position["lng"];
                var latitude = response.results[0].position["lat"];
                city = response.results[0].address["municipality"];
                streetName = response.results[0].address["streetName"];
                // condizione per selezionare lo zoom in caso di città o indirizzo specifico
                if (streetName != undefined && city) {
                    zoom = 16;
                }
                map = tt.map({
                    key: apiKey,
                    style: "tomtom://vector/1/basic-main",
                    container: "map",
                    center: response.results[0].position,
                    zoom: zoom
                });
                
                if (services == false) {
                    getCards(latitude, longitude, range, 1);
                    getCards(latitude, longitude, range, 0);
                } else {
                    getCardsFilter(latitude, longitude, range, 1, services);
                    getCardsFilter(latitude, longitude, range, 0, services);
                }
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
        success: function(response) {
            for (var i = 0; i < response.length; i++) {
                var service = `<button data-servicetype="${response[i].id}" class="services-all">${response[i].service}</button>`;
                $(".services").append(service);
            }
        },
        error: function() {}
    });
}

//chiamata per gli appartamenti senza filtro servizi
function getCards(lat, lng, maxDist, sponsor) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/apartments",
        method: "GET",
        headers: {
            KEY: "test"
        },
        data: {
            lat: lat,
            lng: lng,
            maxDist: maxDist,
            sponsored: sponsor
        },
        success: function(risposta) {
            if (risposta.length > 0) {
                compileHandlebars(risposta, sponsor);
            }
        },
        error: function() {}
    });
}
//chiamata per gli appartamenti con filtro servizi
function getCardsFilter(lat, lng, maxDist, sponsor, services) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/apartments",
        method: "GET",
        headers: {
            KEY: "test"
        },
        data: {
            lat: lat,
            lng: lng,
            maxDist: maxDist,
            services: Array.from(services),
            sponsored: sponsor
        },
        success: function(risposta) {
            if (risposta.length > 0) {
                compileHandlebars(risposta, sponsor);
            }
        },
        error: function() {}
    });
}
////////////////////////////////////
/// funzione per inserire le card della ricerca nel dom e creare i marker associati nella mappa
function compileHandlebars(risp, sponsor) {
    if (sponsor == 1) {
        var containerCards = $("#sponsor");
    } else {
        var containerCards = $("#no-sponsor");
    }
    var source = $("#handlebars_cards").html();
    var templateCards = Handlebars.compile(source);
    const markersCity = [];
    for (let i = 0; i < risp.length; i++) {
        var context = {
            city: risp[i].city,
            title: troncaStringa(risp[i].title),
            id: `<input class="aps_id" type="hidden" name="apartment_id" value=${risp[i].id}>`,
            sponsor: sponsor,
            dataId: risp[i].id,
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
        containerCards.append(htmlContext);
        getImages(risp[i].id, sponsor);
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
                };
            })(marker)
        );

        // cliccando sul marker aggiunge la classe selected alla card dell'appartamento corrispondente
        marker._element.addEventListener("click", function() {
            var posizione = $(this).index() - 1;
            details.removeClass("selected");
            details.eq(posizione).addClass("selected");
        });
        compileServices(risp[i].id);
        

    }
}

//compila i servizi degli appartamenti
function compileServices(id) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/services",
        method: "GET",
        headers: {
            KEY: "test"
        },
        data: {
            id: id,
        },
        success: function(risposta) {
            console.log(risposta);
            if (risposta.length > 0) {
                $('[serv-id="'+ id +'"]').empty();
                for(i = 0; i < risposta.length; i++) {
                    var icon = '<i class="' + risposta[i].icon + '"></i>'
                    $('[serv-id="'+ id +'"]').append(icon);

                }
            }
        },
        error: function() {}
    });
    
    
}


/// appendere le immagini allo slider
function getImages(id, sponsor) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/images",
        method: "GET",
        data: {
            id: id
        },
        headers: {
            KEY: "test"
        },
        success: function(response) {
            var clss = "";
            for (var i = 0; i < response.length; i++) {
                var img = (clss = "hidden");
                if (i == 0) {
                    clss = "first active";
                } else if (i == response.length - 1) {
                    clss = "hidden last";
                } else {
                    clss = "hidden";
                }
                appendImages(response[i], clss, sponsor);
            }
        },
        error: function() {}
    });
}
function appendImages(risp, clss, sponsor) {
    var container = $(".sponsor-" + sponsor);
    container.each(function() {
        var appId = $(this)
            .find(".aps_id")
            .val();
      
        if (appId == risp.apartment_id) {
            img = `<img class="search__resoults__apartment-cards-content-slider-img apt-image ${clss}" 
           src="${risp.path}">`;
            $(this)
                .find(".search__resoults__apartment-cards-content-slider")
                .append(img);
        }
    });
}
// funzione per troncare una stringa
function troncaStringa(stringa) {
    var shortText = "";
    if (stringa.length != 0) {
        for (var i = 0; i < stringa.length; i++) {
            if (stringa[i] == " " && i <= 43) {
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
        if (
            selectedService.length < $(".services-all").length &&
            !selectedService.includes(serviceType)
        ) {
            selectedService.push(serviceType);
        }
        if (!$(this).hasClass("service-selected")) {
            selectedService = selectedService.filter(function(item) {
                return item != serviceType;
            });
        }
    });
    /////// fa prtire la ricerca con i servizi selezionati
    $("#cerca-filtri").click(function() {
        $("#no-sponsor").empty();
        $("#sponsor").empty();
        getCoordinates($('#address-inst').html(), $("#range-value").html(), selectedService);
    });
})();
// al keyup si attiva funzione per l'autocompletamento della search che richiama l'API tomtom
$("#search").keyup(function() {
    $("#auto-complete").empty();
    autoComplete($("#search").val());
});

// //funzione per selezionare suggerimento e restuirlo nella search
$(document).on('click', '.complete-results', function () {
    var value = $(this).text();
    $("#search").val(value);
    getCoordinates($("#search").val());
    $("#auto-complete").removeClass("complete-on");
});

// funzione per i suggerimenti nella search
function autoComplete(query) {
    if (query.length < 3 || query == "") {
        $("#auto-complete").removeClass("complete-on");
    }
    if (query != "" && isNaN(query) && query.length > 3) {
        $("#auto-complete").addClass("complete-on");
        tt.services
            .fuzzySearch({
                key: apiKey,
                query: query
            })
            .go()
            .then(function(response) {
                var address = [];
                var results = "";

                for (let i = 0; i < 4; i++) {
                    if (response.results[i]) {
                        // nel ciclo pusho i risulti in un array e controllo che non ci siano ripetizioni
                        var streetName =
                            response.results[i].address["streetName"];
                        var city = response.results[i].address["municipality"];
                        var countryCode =
                            response.results[i].address["countryCode"];
                        if (
                            streetName != undefined &&
                            !address.includes(streetName) &&
                            city != undefined &&
                            !address.includes(city) &&
                            countryCode == "IT"
                        ) {
                            address.push(streetName + " " + city);
                        } else if (
                            streetName == undefined &&
                            city != undefined &&
                            !address.includes(city) &&
                            countryCode == "IT"
                        ) {
                            address.push(city);
                        }
                    }
                }
                for (let i = 0; i < address.length; i++) {
                    results +=
                        '<div class="complete-results">' +
                        address[i] +
                        "</div>";
                }
                document.getElementById("auto-complete").innerHTML = results;
                if (results == "") {
                    $("#auto-complete").removeClass("complete-on");
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

// per chiudere l'autocomplete al click fuori
$(document).click(function() {
    $("#auto-complete").removeClass("complete-on");
});
//slider
$(document).on("click", ".arrow-slider-sx", function() {
    var activeImage = $(this).siblings(".apt-image.active");
    activeImage.removeClass("active");
    activeImage.addClass("hidden");
    if (activeImage.hasClass("last") == true) {
        activeImage.siblings(".apt-image.first").removeClass("hidden");
        activeImage.siblings(".apt-image.first").addClass("active");
    } else {
        //metto la classe attiva al successivo
        activeImage.next().removeClass("hidden");
        activeImage.next().addClass("active");
    }
});
$(document).on("click", ".arrow-slider-dx", function() {
    var activeImage = $(this).siblings(".apt-image.active");

    activeImage.removeClass("active");
    activeImage.addClass("hidden");

    if (activeImage.hasClass("first") == true) {
        activeImage.siblings(".apt-image.last").removeClass("hidden");
        activeImage.siblings(".apt-image.last").addClass("active");
    } else {
        //metto la classe attiva al successivo
        activeImage.prev().removeClass("hidden");
        activeImage.prev().addClass("active");
    }
});
$('.filter-toggle').click(function(){
  $('.services').toggleClass('hidden');
  $('.filter-search').toggleClass('hidden');
  $(this).text('Chiudi');
  $(this).toggleClass('chiudi');
  if(!$(this).hasClass('chiudi')){
    $(this).text('filtri');
  }
});

