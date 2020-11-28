require("./bootstrap");
require("./add");
require("./sponsor");

var $ = require("jquery");
const Handlebars = require("handlebars");
const { Alert } = require("bootstrap");
const { log } = require("handlebars");

$(document).ready(function() {
    $(".nav__user-box").click(function() {
        $(".nav__user__menu").toggleClass("active");
    });

    $("#search").keydown(function() {
        if (event.which == 13 || event.keyCode == 13) {
            if ($("#search").val() != "") {
                getCoordinates($("#search").val(), $("#range-value").html());
            }
        }
    });
    $(".nav__search-button").click(function() {
        $("#hidenav").hide();
        hidenav();
    });
    $("#search").keyup(function() {
        $("#auto-complete").empty();
        autoComplete($("#search").val());
    });
    //funzione per selezionare suggerimento e restuirlo nella search
    $(document).on("click", ".complete-results", function() {
        var value = $(this).text();
        $("#search").val(value);
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
$(window).bind("mousewheel", function(event) {
    $("#hidenav").show();
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
var slider = (function() {
    var slider = document.getElementById("myRanges");
    var output = document.getElementById("range-value");

    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;
    };
    /// slider da 20 a cento con sfondo custom
    function rangeslider() {
        $("#range-hidden").val($("#range-value").html());
        var range = (slider.value - 20) * 1.25;
        var color =
            "linear-gradient(90deg, rgb(230, 30, 77)" +
            range +
            "%, rgb(214,214,214)" +
            range +
            "%)";
        slider.style.background = color;
    }

    slider.addEventListener("mousemove", function() {
        rangeslider();
    });
    slider.addEventListener("touchmove", function() {
        rangeslider();
    });
    ///////////////////////////////////////////////////
})();
// chiamta che prende ip dell'utente e capisce la regione per ricerca nei paraggi
var getIp = (function() {
    $.ajax({
        mehtod: "GET",
        url: "https://api.ipdata.co",
        data: {
            "api-key":
                "b9bcf03b37c7c5b52f5297af16c2acf07e72d596a1cb8257ed1add0c"
        },
        success: function(risposta) {
            $("#ip-home-search").val(risposta.region);
        },
        error: function() {
            console.log(arguments);
        }
    });
})();


// chiamata api per controllare messaggi non letti
var unreadMessages = (function() {
    var id = $('#nav_user-id').val();
    $.ajax( {
        url: "http://127.0.0.1:8000/api/unread",
        method: "GET",
        headers: {
            KEY: "test",
        },
        data: {
            id: id,
        },
        success: function(risposta) {
            if(risposta.length > 0) {
                // messaggio per count 1
                if(risposta[0].unread == 1) {
                    $('#unread-msg').empty();
                    $('#unread-msg').append(risposta[0].unread + ' nuovo messaggio');
                    $('#unread-msg').append(`<i class="dot fas fa-circle"></i>`);
                // messaggio per count > 1
                } else {
                    $('#unread-msg').empty();
                    $('#unread-msg').append(risposta[0].unread + ' nuovi messaggi');
                    $('#unread-msg').append(`<i class="dot fas fa-circle"></i>`);
                }


            } else {
                $('#unread-msg').empty();
                $('#unread-msg').append('Messaggi');
            }
             

            },
        error: function() {
            consol.log(arguments);
            alert('errore');
        }

    });
})();

// funzione per i suggerimenti nella search
function autoComplete(query) {
    if (query.length < 3 || query == '') {
        $('#auto-complete').removeClass('complete-on');
    }
    if (query != '' && isNaN(query) && query.length > 3) {
        $('#auto-complete').addClass('complete-on');
        tt.services.fuzzySearch({
                key: "31kN4urrGHUYoJ4IOWdAiEzMJJKQpfVk",
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
    $("#auto-complete").removeClass("complete-on");
});


// VALIDAZIONE FORM
var letterNumber = /^[0-9a-zA-Z ]+$/;
var letter = /^[a-zA-Z' ]+$/;
var number = /^[0-9 ]+$/;
var allChar = /^[a-zA-Z0-9'!@#àèòìù\$%\^\&*\)\( +=.,_-]+$/;
var dateR = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
var emailR = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


// validazione input della pagina create e edit apartment
$('#title').focusout(function(){
    checkInput($(this), allChar, 10, 300, 'il titolo');
});
$('#address').focusout(function(){
    checkInput($(this), allChar, 3, 300, "l'indirizzo");
});
$('#city').focusout(function(){
    checkInput($(this), allChar, 1, 30, "la città");
});
$("#postal-code").focusout(function() {
    checkInput($(this), allChar, 1, 20, "il codice postale");
});
$("#country").focusout(function() {
    checkInput($(this), letter, 1, 30, "la nazione");
});
$("#description").focusout(function() {
    checkInput($(this), allChar, 20, 2000, "la descrizione");
});
$('#daily-price').focusout(function(){
    checkInput($(this), number , 1, 2000, "il prezzo");
});
$("#sm").focusout(function() {
    checkInput($(this), number, 1, 2000, "i metri quadrati");
});
$("#rooms").focusout(function() {
    checkInput($(this), number, 1, 2000, "le camere");
});
$("#beds").focusout(function() {
    checkInput($(this), number, 1, 2000, "i letti");
});
$("#bathrooms").focusout(function() {
    checkInput($(this), number, 1, 2000, "i bagni");
});

// al click del submit controlla se i campi soddisfano le condizioni e impedisce il submit del create e del edit apartment
$('#crea').click(function(e){
    if( checkInput($('#title'), allChar, 10, 300, 'il titolo') &&
        checkInput($('#address'), allChar, 3, 300, "l'indirizzo") &&
        checkInput($('#city'), allChar, 1, 30, "la città") &&
        checkInput($('#postal-code'), allChar, 1, 20, "il codice postale") &&
        checkInput($('#country'), letter, 1, 30, "la nazione") &&
        checkInput($('#description'), allChar, 20, 2000, "la descrizione") &&
        checkInput($('#daily-price'), number , 1, 2000, "il prezzo prezzo") &&
        checkInput($('#sm'), number , 1, 2000, "i metri quadrati") &&
        checkInput($('#rooms'), number , 1, 2000, "le camere") &&
        checkInput($('#beds'), number , 1, 2000, "i letti") &&
        checkInput($('#bathrooms'), number , 1, 2000, "i bagni") ||

            checkInput($('#title'), allChar, 10, 300, 'il titolo') ||
            checkInput($('#address'), allChar, 3, 300, "l'indirizzo") ||
            checkInput($('#city'), allChar, 1, 30, "la città") ||
            checkInput($('#postal-code'), allChar, 1, 20, "il codice postale") ||
            checkInput($('#country'), letter, 1, 30, "la nazione") ||
            checkInput($('#description'), allChar, 20, 2000, "la descrizione") ||
            checkInput($('#daily-price'), number , 1, 2000, "il prezzo") ||
            checkInput($('#sm'), number , 1, 2000, "i metri quadrati") ||
            checkInput($('#rooms'), number , 1, 2000, "le camere") ||
            checkInput($('#beds'), number , 1, 2000, "i letti") ||
            checkInput($('#bathrooms'), number , 1, 2000, "i bagni")
        ){
        e.preventDefault();
    }
});

// validazione input della pagina register
$('#firstnameR').focusout(function(){
    checkInput($(this), letter, 2, 50, 'il nome');
});
$('#lastnameR').focusout(function(){
    checkInput($(this), letter, 2, 50, 'il cognome');
});
$('#emailR').focusout(function(){
    checkInput($(this), emailR, 2, 255, 'la mail');
});
$('#passwordR').focusout(function(){
    checkInput($(this), allChar, 8, 255, 'la password');
});
$('#password-confirmR').focusout(function(){
    if($('#password-confirmR').val() != $('#passwordR').val() || $('#password-confirmR').val() == ''){
        $(this).addClass('error');
        $(this).next('.message').addClass('message-on');
        $(this).next('.message').text('Le password non sono uguali');
    }
});
$('#dateR').focusout(function(){
   if($('#dateR').val() == ''){
    $(this).addClass('error');
    $(this).next('.message').addClass('message-on');
    $(this).next('.message').text('Non hai inserito la data');
   }else{
    $(this).removeClass('error');
    $(this).next('.message').removeClass('message-on');
   }
});

// Al click del form register controlla se tutte le condizione sono soddisfatte
$('#registerR').click(function(e){
    if(checkInput($('#firstnameR'), letter, 2, 50, 'il nome') &&
        checkInput($('#lastnameR'), letter, 2, 50, 'il cognome') &&
        checkInput($('#emailR'), emailR, 2, 255, 'la mail') &&
        checkInput($('#passwordR'), allChar, 8, 255, 'la password') &&
        $('#password-confirmR').val() != $('#passwordR').val() &&
        $('#password-confirmR').val() == '' &&
        $('#dateR').val() == '' ||

        checkInput($('#firstnameR'), letter, 2, 50, 'il nome') ||
        checkInput($('#lastnameR'), letter, 2, 50, 'il cognome') ||
        checkInput($('#emailR'), emailR, 2, 255, 'la mail') ||
        checkInput($('#passwordR'), allChar, 8, 255, 'la password') ||
        $('#password-confirmR').val() != $('#passwordR').val() ||
        $('#password-confirmR').val() == '' ||
        $('#dateR').val() == ''
    ){
        e.preventDefault();
    }
});
// fine pagina register

// validazione pagina login
$('#emailL').focusout(function(){
    checkInput($(this), emailR, 2, 255, 'la mail');
});
$('#passwordL').focusout(function(){
    checkInput($(this), allChar, 8, 255, 'la password');
});

$('#registerL').click(function(e){
    if(checkInput($('#emailL'), emailR, 2, 255, 'la mail') &&
    checkInput($('#passwordL'), allChar, 8, 255, 'la password') ||

    checkInput($('#emailL'), emailR, 2, 255, 'la mail') ||
    checkInput($('#passwordL'), allChar, 8, 255, 'la password')
    ){
        e.preventDefault();
    }
});
// fine validazione pagina login

// funzione per controllare lato client il form
function checkInput(selector, kind, min, max, field) {
    if (
        selector.val() == "" ||
        !matchKind(selector, kind) ||
        selector.val().length < min ||
        selector.val().length > max
    ) {
        selector.addClass("error");
        selector.next(".message").addClass("message-on");
        if (selector.val() == "") {
            selector.next(".message").text("Non hai inserito " + field);
        } else if (!matchKind(selector, kind)) {
            selector.next('.message').text('Hai inserito un formato non valido');
        } else if (selector.val().length < min) {
            selector.next(".message").text("Il campo è troppo breve");
        } else if (selector.val().length > max) {
            selector.next(".message").text("Il campo è troppo lungo");
        }
        return true;
    } else {
        selector.removeClass("error");
        selector.next(".message").removeClass("message-on");
    }
}

// funzione per controllare se l'input soddisfa la condizione di tipo
function matchKind(selector, kind) {
    if (selector.val().match(kind)) {
        return true;
    }
    return false;
}

$(".openB").click(function () {

    $(".left").addClass("open");
    setTimeout(function () {
        $(".right").addClass("open");
    }, 250);
    setTimeout(function () {
        $(".back").addClass("open");
        $(".front").addClass("display");
    }, 350);
    $(".closeB").delay(1000).fadeIn();
});

$(".closeB").click(function () {

    setTimeout(function () {
        $(".left").removeClass("open");
    }, 250);
    $(".right").removeClass("open");
    setTimeout(function () {
        $(".back").removeClass("open");
        $(".front").removeClass("display");
    }, 600);
    $(".closeB").fadeOut();
});

$(".pay").click(function () {
    setTimeout(function () {
        $(".form-container").addClass("acti");
    }, 500);
});

$("#sponsorBasic").click(function () {
    $('#amount').val([2.99]);
   $('#sponsor_plan').val([1]);
});
$("#sponsorMedium").click(function () {
    $('#amount').val([5.99]);
   $('#sponsor_plan').val([2]);
});
$("#sponsorPremium").click(function () {
    $('#amount').val([9.99]);
   $('#sponsor_plan').val([3]);
});
