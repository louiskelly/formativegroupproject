var url = 'https://query.yahooapis.com/v1/public/yql';

var placevar = ''
var weatherArray = [];
var containerId = '';

var wellingtonCheck = 0;
var aucklandCheck = 0;
var napierCheck = 0;
var christchurchCheck = 0;

function wellingtonFunc(){
	if(wellingtonCheck == 0){

	placevar = "Wellington, New Zealand";
	definePlace();
	containerId = '#wellingtonDiv';
	wellingtonCheck++
	}
		$('#wellingtonDiv').fadeIn(1000);
		$('#aucklandDiv').hide();
		$('#napierDiv').hide();
		$('#christchurchDiv').hide();
		$('#weatherh3').text('Wellington weather over next 5 days');
}

function aucklandFunc(){
	if(aucklandCheck == 0){

	placevar = "Auckland, New Zealand";
	definePlace();
	containerId = '#aucklandDiv';
	aucklandCheck++
	}
		$('#wellingtonDiv').hide();
		$('#aucklandDiv').fadeIn(1000);
		$('#napierDiv').hide();
		$('#christchurchDiv').hide();
		$('#weatherh3').text('Auckland weather over next 5 days');
}

function napierFunc(){
	if(napierCheck == 0){

	placevar = "Napier, New Zealand";
	definePlace();
	containerId = '#napierDiv';
	napierCheck++
	}
		$('#wellingtonDiv').hide();
		$('#aucklandDiv').hide();
		$('#napierDiv').fadeIn(1000);
		$('#christchurchDiv').hide();
		$('#weatherh3').text('Napier weather over next 5 days');
}

function christchurchFunc(){
	if(christchurchCheck == 0){

	placevar = "Christchurch, New Zealand";
	definePlace();
	containerId = '#christchurchDiv';
	christchurchCheck++
	}
		$('#wellingtonDiv').hide();
		$('#aucklandDiv').hide();
		$('#napierDiv').hide();
		$('#christchurchDiv').fadeIn(1000);
		$('#weatherh3').text('Christchurch weather over next 5 days');
}



function definePlace(){

	var yql = 'select title, units.temperature, item.forecast from weather.forecast where woeid in (select woeid from geo.places where text="' + placevar +'") and u = "C" limit 5 | sort(field="item.forecast.date", descending="false");';
	
	var iconUrl = 'https://s.yimg.com/zz/combo?a/i/us/we/52/';
	
	$.ajax({url: url, data: {format: 'json', q: yql}, method: 'GET', dataType: 'json'})
		.success(function(data) {
			if (data.query.count > 0) {
				jQuery.each(data.query.results.channel, function(idx, result) {
					console.log(result);
					var f = result.item.forecast;
					var u = result.units.temperature;
					
					var c = $('#weather').clone();
					c.find('.weather_date').text(f.date);
					c.find('.weather_temp_min').text(f.low + u);
					c.find('.weather_temp_max').text(f.high + u);
					c.find('.weather_icon').attr('src', iconUrl + f.code + '.gif');
					c.find('.weather_text').text(f.text);
					
					c.css('display', 'inline-block');
					
					c.appendTo($(containerId));

				});
			}
		}
	);
}

  var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 5,
     center: new google.maps.LatLng(-40.1, 172),
     mapTypeId: google.maps.MapTypeId.ROADMAP
   });

   var infowindow = new google.maps.InfoWindow();

   var wellingtonMarker = new google.maps.Marker({
   	position : {lat: -41.2865, lng: 174.7762},
   	map: map,
   	title: 'hi'
   })
   var aucklandMarker = new google.maps.Marker({
   	position : {lat: -36.8485, lng: 174.7633},
   	map: map,
   	title: 'hi'
   })
   var napierMarker = new google.maps.Marker({
   	position : {lat: -39.4928, lng: 176.9120},
   	map: map,
   	title: 'hi'
   })
   var christchurchMarker = new google.maps.Marker({
   	position : {lat: -43.5321, lng: 172.6362},
   	map: map,
   	title: 'hi'
   })

    google.maps.event.addListener(wellingtonMarker, 'click', function(){
    	wellingtonFunc();
    });

    google.maps.event.addListener(aucklandMarker, 'click', function(){
    	aucklandFunc();
    });

    google.maps.event.addListener(napierMarker, 'click', function(){
    	napierFunc();
    });

    google.maps.event.addListener(christchurchMarker, 'click', function(){
    	christchurchFunc();
    });
