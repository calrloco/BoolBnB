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