var $ = require('jquery');
const apiKey = '31kN4urrGHUYoJ4IOWdAiEzMJJKQpfVk';


// aggiunta campo input file fino ad un max di 5
$('#add-img').click(function() {
    if ( $('.img-input').length < 5) {
        $('.container-upload').append(`<input class="img-input" type="file" name="img[]" class="form-control-file" id="img" accept="image/*">`);
        if ($('.img-input').length >= 5) {
            $('#add-img').hide();
        }
    } 

});






// functions
    // function searchAddress(data, api){

    //     if (data != ''){
    //     tt.services.fuzzySearch({
    //     key: api,
    //     query: data
    //     }).go()
    //     .then(function(response){
            
        
    //     var address = response.results[0].address['streetName'];
    //     var longitude = response.results[0].position['lng'];
    //     var latitude = response.results[0].position['lat'];
    //     var city = response.results[0].address['municipality'];
    //     var postalCode = response.results[0].address['postalCode'];
    //     var country = response.results[0].address['country'];
        
    //     // se sono nel form crea apartament richiamo la funzione
    //     console.log('lat' + response.results[0].position['lat']);
    //     console.log('lng' + response.results[0].position['lng']);
        
        
        