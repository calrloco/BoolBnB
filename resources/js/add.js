//JS PER PAGINE CREATE ED EDIT

var $ = require('jquery');
const Handlebars = require("handlebars");
const apiKey = '31kN4urrGHUYoJ4IOWdAiEzMJJKQpfVk';

//QUANDO ESCE DAI CAMPI INTERESSATI RICALCOLA LE COORDINATE IN CAMPI HIDDEN
$('#address, #city, #postal').focusout(function() {
    calcoloCoordinate();
})

$(document).on('click', '.img-detele', function() {
    $(this).submit();
});






// FUNZIONI

// calcolo coordinate con chiamata all'api tomtom
function calcoloCoordinate() {
    var data = $('#address').val() + " " + $('#city').val() + " " + $('#postal').val();
    console.log(data);
    tt.services.fuzzySearch({
        key: apiKey,
        query: data
    }).go()
    .then(function(response){
        
        $('#longitude').attr('value', response.results[0].position['lng']);
        $('#latitude').attr('value', response.results[0].position['lat']);

    
    
    });
}


