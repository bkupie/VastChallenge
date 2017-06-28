$("#openModalButton").click(function(){
	$('#ex14').slider({
	          	formatter: function(value) {
	            	return 'Current value: ' + value;
	          	}
	        });
})

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
