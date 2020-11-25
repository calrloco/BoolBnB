require("./bootstrap");
require("./add");
require("./sponsor");
require("./apt");
var $ = require("jquery");
const Handlebars = require("handlebars");
const { Alert } = require("bootstrap");

$(document).ready(function() {
    $(".nav__user-box").click(function() {
        $(".nav__user__menu").toggleClass("active");
        getcards();
    });
    $('#search').keydown(function(){
        if (event.which == 13 || event.keyCode == 13){
            if ($("#search").val() != "") {
                getCoordinates($("#search").val(), $("#range-value").html()); 
        }
      }
    });
    $(".nav__search-button").click(function() {
        $('#hidenav').hide()
        hidenav();
    });
    $("#search").keyup(function () {
        $('#auto-complete').empty();
        autoComplete($("#search").val());
    });
    //funzione per selezionare suggerimento e restuirlo nella search
    $(document).on('click', '.complete-results', function () {
        var value = $(this).text();
        $('#search').val(value);
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

// funzione per i suggerimenti nella search
function autoComplete(query) {
    if (query.length < 3 || query == '') {
        $('#auto-complete').removeClass('complete-on');
    }
    if (query != '' && isNaN(query) && query.length > 3) {
        $('#auto-complete').addClass('complete-on');
        tt.services.fuzzySearch({
                key: '31kN4urrGHUYoJ4IOWdAiEzMJJKQpfVk',
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
                    $('#auto-complete').removeClass('complete-on');
                }
            });

    }
}


// per chiudere l'autocomplete al click fuori
$(document).click(function() {
    $('#auto-complete').removeClass('complete-on');
  });


// validazione tipi
var letterNumber = /^[0-9a-zA-Z ]+$/;
var letter = /^[a-zA-Z ]+$/;
var number = /^[0-9 ]+$/;
var allChar = /^[a-zA-Z0-9!@#\$%\^\&*\)\( +=._-]+$/;


// validazione input della pagina create
$('#title').focusout(function(){
    checkInput($(this), allChar, 10, 300, 'il titolo');
});
$('#address').focusout(function(){
    checkInput($(this), letterNumber, 10, 300, "l'indirizzo");
});
$('#city').focusout(function(){
    checkInput($(this), letter, 1, 30, "la città");
});
$('#postal-code').focusout(function(){
    checkInput($(this), number, 1, 20, "il codice postale");
});
$('#country').focusout(function(){
    checkInput($(this), letter, 1, 30, "la nazione");
});
$('#description').focusout(function(){
    checkInput($(this), allChar, 20, 2000, "la descrizione");
});
$('#daily-price').focusout(function(){
    checkInput($(this), number , 1, 2000, "il prezzo giornaliero");
});
$('#sm').focusout(function(){
    checkInput($(this), number , 1, 2000, "i metri quadrati");
});
$('#rooms').focusout(function(){
    checkInput($(this), number , 1, 2000, "le camere");
});
$('#beds').focusout(function(){
    checkInput($(this), number , 1, 2000, "i letti");
});
$('#bathrooms').focusout(function(){
    checkInput($(this), number , 1, 2000, "i bagni");
});


$('#crea').click(function(e){
    e.preventDefault();
});

// funzione per controllare lato client il form
function checkInput(selector, kind, min, max, field) {
    if (selector.val() == '' || (!matchKind(selector, kind)) || selector.val().length < min || selector.val().length > max) {
        selector.addClass('error');
        selector.next('.message').addClass('message-on');
        if (selector.val() == '') {
            selector.next('.message').text('Non hai inserito ' + field);
        } else if (!matchKind(selector, kind)) {
            selector.next('.message').text('Hai inserito un carattere non valido');
        } else if (selector.val().length < min) {
            selector.next('.message').text('Il campo è troppo breve');
        } else if (selector.val().length > max) {
            selector.next('.message').text('Il campo è troppo lungo');
        }
    } else {
        selector.removeClass('error');
        selector.next('.message').removeClass('message-on');
    }
}


// funzione per controllare se l'input soddisfa la condizione di tipo
function matchKind(selector, kind){
    if(selector.val().match(kind)){
        return true;
    }
    return false;
}



