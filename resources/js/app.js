require('./bootstrap');
var $ = require('jquery');

$(document).ready(function(){
  $('.nav__user-box').click(function(){ 
      $('.nav__user__menu').toggleClass('active');
  });
});
