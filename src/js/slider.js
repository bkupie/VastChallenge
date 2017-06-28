$("#openModalButton").click(function(){
	$('#ex14').slider({
	          	formatter: function(value) {
	            	return 'Current value: ' + value;
	          	}
	        });
})

var slider = new Slider("#ex13", {
    ticks: [0, 100, 200, 300, 400],
    ticks_labels: ['$0', '$100', '$200', '$300', '$400'],
    ticks_snap_bounds: 30
});


function refresh()
{
  var thisModal =$('#myModal');
  thisModal.modal('show');
  $("#slider").slider("refresh");
  thisModal.modal('hide');
 console.log("HELLO");

}

var thisModal =$('#myModal');
thisModal.modal('show');
$("#slider").slider("refresh");
thisModal.modal('hide');
