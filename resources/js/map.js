require("./bootstrap");
var $ = require("jquery");
const Handlebars = require("handlebars");
const { log } = require("handlebars");

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
        getCoordinates($("#address-inst").html());
    })();
    $(".nav__search-icon-big").click(function() {
        $(".search__resoults__apartment-cards").empty();
    
        getCoordinates($("#search").val());
    });

    
});



//// prendi coordinate dell'input////////////////
function getCoordinates(input, maxDist) {
    tt.services
        .fuzzySearch({
            key: apiKey,
            query: input,
        })
        .go()
        .then(function(response) {
            map = tt.map({
                key: apiKey,
                style: 'tomtom://vector/1/basic-main',
                container: 'map',
                center: response.results[0].position,
                zoom: 10
        
              });
            var longitude = response.results[0].position["lng"];
            var latitude = response.results[0].position["lat"];
            city = response.results[0].address['municipality'];
            getCards(latitude, longitude, 20);
            console.log(response);
        });
}

/////////// chiamata all nostro db che richiama funzione handlebars
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
            compileHandlebars(risposta, maxDist);
           
            
    
        },
        error: function() {
            console.log("error");
        }
    });
}

////////////////////////////////////
/// funzione per inserire le card della ricerca nel dom e creare i marker associati nella mappa
function compileHandlebars(risp, maxDist) {
    var source = $("#handlebars_cards").html();
    var templateCards = Handlebars.compile(source);
    const markersCity = [];
    for (var i = 0; i < risp.length; i++) {
        var context = {
            city: risp[i].city,
            title: troncaStringa(risp[i].title),
            id: `<input type="hidden" name="apartment_id" value=${risp[i].apartment_id}>`,
            img: risp[i].path
        };

        var coordinates = [
            risp[i].longitude,
            risp[i].latitude
        ];
        var address = risp[i].address;
        var city = risp[i].city;
        var price = risp[i].daily_price;
        // creo il custom marker
        var element = document.createElement('div');
        element.id = 'marker';
        const marker = new tt.Marker({element: element}).setLngLat(coordinates).setPopup(new tt.Popup({offset: 35}).setHTML(address)).addTo(map);


        var popupOffsets = {
            top: [0, 0],
            bottom: [0, -70],
            'bottom-right': [0, -70],
            'bottom-left': [0, -70],
            left: [25, -35],
            right: [-25, -35]
        }

        // popup sui marker 
        var popup = new tt.Popup({
            offset: popupOffsets
        }).setHTML(address + ' ' + city + ' ' + '<br>' + '<strong>' + price + '</strong>' + ' € a notte');

        // assegno il popup
        marker.setPopup(popup);
      
        

        var htmlContext = templateCards(context);
        $(".search__resoults__apartment-cards").append(htmlContext);

        var el = $('.search__resoults__apartment-cards-content');

        // cliccando su un elemento della lista a sx lo trova in mappa
        el.on('click',
        (function(marker) {
            const activeItem = $(this);
            return function() {
                map.easeTo({
                    center: marker.getLngLat(),
                    zoom: 16
                });
                closeAllPopups();
                // marker.togglePopup();
            }
        })(marker)
    );

    // richiama funzione che associa l'address con la card nel DOM
    var details =  buildLocation(el, address);
      
    // cliccando sul marker aggiunge la classe selected alla card dell'appartamento corrispondente
       marker._element.addEventListener('click',
        (function () {           
            var posizione = $(this).index() - 1;
            // console.log(posizione);
            details.removeClass('selected');
            details.eq(posizione).addClass('selected');          
        })
    );

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

//funzione che associa l'address con la card apartment nel DOM
function buildLocation(el, text) {
    const details =  el;
    details.innerHTML = text;
    return details;
    }