var $ = require('jquery');
const Handlebars = require("handlebars");
const apiKey = '31kN4urrGHUYoJ4IOWdAiEzMJJKQpfVk';

$('#address, #city, #postal').focusout(function() {
    calcoloCoordinate()
})





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

function createApart(response, apartmentData) {

    $.ajax(
        {
            url: 'http://127.0.0.1:8000/api/apartments',
            method: 'POST',
            headers: {
                KEY: 'test'
            },

            data: {
                title: apartmentData.title,
                address: apartmentData.address,
                city: apartmentData.city,
                postal_code: apartmentData.postalCode,
                country: apartmentData.country,
                description: apartmentData.description,
                daily_price: apartmentData.dailyPrice,
                sm: apartmentData.sm,
                rooms: apartmentData.rooms,
                beds: apartmentData.beds,
                user_id: apartmentData.user_id,
                bathrooms: apartmentData.bathrooms,
                img: apartmentData.img,
                latitude: response.results[0].position['lng'],
                longitude: response.results[0].position['lat'],
                

            },
            success: function(data) {
                console.log(data);
                alert('appartamento inserito');
            },
            error: function(errore) {
               console.log(errore);
            }

        }
    )
}