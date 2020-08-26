$(document).ready( function(){
    $("#dynamicQR").change(function() {
        if ($(this).val() == "dynamic") {
          $('#formWhenDynamicSelected').show();
          $('#checkDate').attr('required', '');
          $('#date').attr('data-error', 'This field is required.');
        } else {
          $('#formWhenDynamicSelected').hide();
          $('#checkDate').removeAttr('required');
          $('#date').removeAttr('data-error');
        }
      });

    // function getDate(){
	// 	var today = new Date();
	// 	console.log('SHOW')
	// 	document.getElementById("date").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
	// }

	// window.onload = function() {
	// 	getDate();
	//   };
})