$('#add-img').click(function() {
    if ( $('.container-upload').length < 5) {
        $('.container-upload').append(`<input class="img-input" type="file" name="img[]" class="form-control-file" id="img" accept="image/*">`);
        if ($('.container-upload').length) {
            $('#add-img').hide();
        }
    } 

});
