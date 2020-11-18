require("./bootstrap");
var $ = require("jquery");
const Handlebars = require("handlebars");

$(document).ready(function() {
    $(".nav__user-box").click(function() {
        $(".nav__user__menu").toggleClass("active");
        getcards();
    });

    $("#hidenav").click(function() {
        $(this).hide();
        hidenav();
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

//// statistiche
var myfunction = (function () {
  var labels = [];
  var dataSet = [];
$.ajax({
   url:'http://127.0.0.1:8000/api/stats',
   method: 'GET',
   headers: {
       KEY:'test'
   },
   data:{
       id:'7'
   },
   success:function(response){
       console.log(response);
        for (var i = 0; i <response.length; i++){
            labels.push(response[i].date);
            dataSet.push(response[i].daily_views);
        }
        console.log(labels,dataSet);
        compileChart(labels,dataSet);
   },
   error:function(){
       console.log('connessione non riuscita');
   }
});
})();
function compileChart(chrat,label,dataset){
var views = $('#chart');
var statChart = new Chart(views,{
     type: "line",
     data:{
         labels:label,
         datasets:[{
             label:'visualizzazioni',
             data:dataset,
         }],
     },
     options:{}
});
}