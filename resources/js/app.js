require('./bootstrap');
var $ = require('jquery');
const Handlebars = require("handlebars");

$(document).ready(function(){
  $('.nav__user-box').click(function(){ 
      $('.nav__user__menu').toggleClass('active');
  });
  var getCards = function(){
  $.ajax({
    url: 'http://127.0.0.1:8000/api/apartments',
    method: 'GET',
    headers: {
      'KEY':'test'
    },
    success: function(risposta){
      console.log(risposta);
        compileHandlebars(risposta);
    },
    error: function(){
      console.log('error');
    }
  });
}();
 

});

/// funziione per inserire le card della ricerca nel dom
function compileHandlebars(risp) {
  var source = $('#handlebars_cards').html();
  var templateCards = Handlebars.compile(source);
  for(var i = 0; i <risp.length; i++){
    var context = {
      city:risp[i].city,
      title: troncaStringa(risp[i].title),
      id:`<input type="hidden" name="apartment_id" value=${risp[i].id}>`,
    };
    var htmlContext = templateCards(context);
    $('.search__resoults__apartment-cards').append(htmlContext);
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
