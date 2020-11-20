var $ = require('jquery');
const apiKey = '31kN4urrGHUYoJ4IOWdAiEzMJJKQpfVk';


// aggiunta campo input file fino ad un max di 5
$('#add-img').click(function() {
    if ( $('.img-input').length < 5) {
        $('.container-upload').append(`<input type="file" name="img" enctype="multipart/form-data" class="img-input form-control-file" id="img" accept="image/*">`);
        if ($('.img-input').length >= 5) {
            $('#add-img').hide();
        }
    }
});

$('#crea').on('click', (function(event) {
    // SALVO I VALORI DEL FORM
    // var form = $('#creazione').serializeArray();
    // console.log(form);
    
    // salvo i checkbox con un ciclo
    var services = [];
    $('input[name=services]').each(function() {
        var ischecked = $(this).is(":checked");
        if (ischecked) {
            services.push($(this).val());
        }
    }); 
    console.log(services)

    //uguale per le immagini
    var images = [];
    $('input[name=img]').each(function() {
        if($(this).val() != "") {
            images.push($(this).val());
        }

    });
    console.log(images);
   
    
    var apartmentData = {
    
        title: $('input[name=title]').val(),
        address: $('#address').val(),
        city: $('input[name=city]').val(),
        postalCode: $('input[name=postal-code]').val(),
        country: $('input[name=country]').val(),
        description: $('textarea[name=description]').val(),
        dailyPrice: $('input[name=daily-price]').val(),
        sm: $('input[name=sm]').val(),
        rooms: $('input[name=rooms]').val(),
        beds: $('input[name=beds]').val(),
        bathrooms: $('input[name=bathrooms]').val(),
        services: services,
        user_id: $('input[name=user-id]').val(),
        img: $("input:image"),
    }
    console.log(apartmentData)

    var data = $('#address').val() + " " + $('#city').val() + " " + $('#postal').val();
    // console.log(data);
    tt.services.fuzzySearch({
        key: apiKey,
        query: data
    }).go()
    .then(function(response){
       createApart(response, apartmentData)

        
        
        
        
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
        
// FUNZIONI

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