
function refresh()
{
  var thisModal =$('#myModal');
  thisModal.modal('show');
  $("#slider").slider("refresh");
  thisModal.modal('hide');

 $("#ex6SliderVal").text("");

}

var thisModal =$('#myModal');
thisModal.modal('show');
$("#slider").slider("refresh");
thisModal.modal('hide');

function dateChange(date){
   console.log("Hi");
 var system = new imgSystem();
 system.initialize("data/CSV/image09_2016_03_06.csv",canvas,'sic')
}
