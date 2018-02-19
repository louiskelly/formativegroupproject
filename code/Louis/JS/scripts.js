var dokidoki = 0;

setInterval(function(){

	$.ajax({
		url: "https://dweet.io/get/latest/dweet/for/ADN",
		dataType: "json",
		success: function(data){
			dokidoki= data.with[0].content.Windspeed;

			$('#windspeed').text(dokidoki);
		},
		error:function(error){
			console.log(error)
		}
	})
}, 2000);