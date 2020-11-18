
$('#sponsors-select').on('change',function(){
    $('#summary-sponsor').empty();
    var check = $('#sponsors-select').val();
    var sponsor = JSON.parse(check);
    var price = sponsor.sponsor_price;
    $('#summary-sponsor').append(price);
    console.log(sponsor);


$('#btn-sponsor').click(function(){
    // var price = sponsor.sponsor_price;
    // $('#summary-sponsor').append(price);
    console.log(price);
});
});

var aptId = $('#apt-id').val();
console.log(aptId);
