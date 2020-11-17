var $ = require('jquery');
const apiKey = '31kN4urrGHUYoJ4IOWdAiEzMJJKQpfVk';


// aggiunta campo input file fino ad un max di 5
// $('#add-img').click(function() {
//     if ( $('.img-input').length < 5) {
//         $('.container-upload').append(`<input class="img-input" type="file" name="img[]" class="form-control-file" id="img" accept="image/*">`);
//         if ($('.img-input').length >= 5) {
//             $('#add-img').hide();
//         }
//     } 

// });

$('#crea').on('click', (function(event) {
    // SALVO I VALORI DEL FORM
    var title = $('input[data=title]');
    var address = $('input[data=address]');
    var city = $('input[data=city]');
    var postalCode = $('input[data=postal-code]');
    var country = $('input[data=country]');
    var description = $('input[data=description]');
    var dailyPrice = $('input[data=daily-price]');
    var sm = $('input[data=sm]');
    var beds = $('input[data=beds]');
    var bathrooms = $('input[data=bathrooms]');
    
    // salvo i checkbox con un ciclo
    var services = [];
    $('input[name=services]').each(function() {
        var ischecked = $(this).is(":checked");
        if (ischecked) {
            services.push($(this).val());
        }
    }); 
    //uguale per le immagini
    var images = [];
    $('input[name=img]').each(function() {
        
    
    });


    var data = $('#address').val() + " " + $('#city').val() + " " + $('#postal').val();
    console.log(data);
    tt.services.fuzzySearch({
        key: apiKey,
        query: data
    }).go()
    .then(function(response){
        console.log(response);
        
        
        
        
    });
    event.preventDefault();
}));
    
    


    
    
    // se sono nel form crea apartament richiamo la funzione
    // console.log('lat' + response.results[0].position['lat']);
    // console.log('lng' + response.results[0].position['lng']);
    // var address = response.results[0].address['streetName'];
    // var longitude = response.results[0].position['lng'];
    // var latitude = response.results[0].position['lat'];
    // var city = response.results[0].address['municipality'];
    // var postalCode = response.results[0].address['postalCode'];
    // var country = response.results[0].address['country'];
        
        
        