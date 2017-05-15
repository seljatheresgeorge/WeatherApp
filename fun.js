//date and location
var today;
var dd;
var mm;
var yy;
var day;
var days1;
var days;
var months;
function starthere(){
	today=new Date();
	dd=today.getDate();
	mm=today.getMonth();
	yy=today.getFullYear();
	day=today.getDay();
	days1=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	days=['SUN','MON','TUE','WED','THU','FRI','SAT'];
	months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	 $("#curweath").css('visibility', 'hidden');
     $(".Rectangle-5").css('visibility', 'hidden');
	showdate();
	
}
function showdate(){
	if(dd<10) {dd='0'+dd;}
	$('.day').html(days1[day]);
	$('#date').html(dd);
	yy=yy % 100;
	var tempo=months[mm]+' '+yy;
	$('#monyear').html(tempo);
	getLocation();
}
function getLocation()
{
	 if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {

		$.get("https://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng="+position.coords.latitude+","+position.coords.longitude+"&key=AIzaSyDP9Uao5250FRIERzx4DhoiwnPPIp5yfIs",function(data){
			var components= data.results[0].address_components;
            for(var i=0;i<components.length;i++){
                if(components[i].types.includes('locality')){
                    $('#city').html(components[i].long_name+",");
                    var cco=components[i].long_name;
                }
                else if(components[i].types.includes('sublocality')){
                    var cci=components[i].long_name;
                }
                else if(components[i].types.includes('country')){
                    $('#country').html(components[i].long_name);
                }
                $('.cityname').html(cci+","+cco);
            }
		});

		
	  	getweather(position); 
	}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}






//searchbox
var autocomplete;
function initAutocomplete() {
    
        autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('citysearch')),
            { types: ['(cities)']});
        autocomplete.addListener('place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
            
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
        var comp=place.address_components;
        for (var i = 0; i < comp.length; i++) {
                 if (comp[i].types.includes('country')) {
                    searchcountry=comp[i].long_name;
                }
                else if(comp[i].types.includes('locality'))
                    searchcity=comp[i].long_name;
            }
      });
  }

  function getlocweather(){

    if(searchcity!=''&&searchcountry!=''){
        $.get("http://api.openweathermap.org/data/2.5/forecast?q="+searchcity+","+searchcountry+"&appid=b17cef20cf89092838efdd70812c7aaf",function(data){
            
            $('.weather-image').attr("src",setimage(data.list[0].weather[0].description));
            
            $('#tempval').html(Math.floor(data.list[0].main.temp-273));

            $('.image1').attr("src",setimage(data.list[0].weather[0].description));
            $('#tempmax1').html(Math.ceil(data.list[0].main.temp_max-273)+"&deg;");
            $('#tempmin1').html(Math.floor(data.list[0].main.temp_min-273)+"&deg;");
            $('#day1').html(days[day]);

            $('.image2').attr("src",setimage(data.list[7].weather[0].description));
            $('#tempmax2').html(Math.ceil(data.list[7].main.temp_max-273)+"&deg;");
            $('#tempmin2').html(Math.floor(data.list[7].main.temp_min-273)+"&deg;");
            $('#date2').html(days[(day+1)%7]);

            $('.image3').attr("src",setimage(data.list[15].weather[0].description));
            $('#tempmax3').html(Math.ceil(data.list[15].main.temp_max-273)+"&deg;");
            $('#tempmin3').html(Math.floor(data.list[15].main.temp_min-273)+"&deg;");
            $('#day3').html(days[(day+2)%7]);

            $('.image4').attr("src",setimage(data.list[23].weather[0].description));
            $('#tempmax4').html(Math.ceil(data.list[23].main.temp_max-273)+"&deg;");
            $('#tempmax4').html(Math.floor(data.list[23].main.temp_min-273)+"&deg;");
            $('#day4').html(days[(day+3)%7]);

            $('.image5').attr("src",setimage(data.list[31].weather[0].description));
            $('#tempmax5').html(Math.ceil(data.list[31].main.temp_max-273)+"&deg;");
            $('#tempmin5').html(Math.floor(data.list[31].main.temp_min-273)+"&deg;");
            $('#day5').html(days[(day+4)%7]);

            $('#city').html(searchcity+",");
            $('#country').html(searchcountry);
            $("#curweath").css('visibility', 'visible');
            $(".Rectangle-5").css('visibility', 'visible');
        });
    }
}

function geolocate() {
        if (navigator.geolocation) {

          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
      }












function getweather(position){
	$.get("http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=5e6764119764d1b46052fd249383f76a",function(data){
	    	
	    	$('.weather-image').attr("src",setimage(data.weather[0].description));
	    	$('.curwimg').attr("src",setimage(data.weather[0].description));
	    	$('#tempval').html(Math.floor(data.main.temp-273));
	    	$('#curtempval').html(Math.floor(data.main.temp-273));
	    	$('#currentweather').show();
	    	});
	    $.get("http://api.openweathermap.org/data/2.5/forecast?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=5e6764119764d1b46052fd249383f76a",function(data){
	    	
	    	$('.image1').attr("src",setimage(data.list[0].weather[0].description));
	    	$('#tempmax1').html(Math.ceil(data.list[0].main.temp_max-273)+'&deg;');
	    	$('#tempmin1').html(Math.floor(data.list[0].main.temp_min-273)+'&deg;');
	    	$('#day1').html(days[day]);

	    	$('.image2').attr("src",setimage(data.list[7].weather[0].description));
	    	$('#tempmax2').html(Math.ceil(data.list[7].main.temp_max-273)+'&deg;');
	    	$('#tempmin2').html(Math.floor(data.list[7].main.temp_min-273)+'&deg;');
	    	$('#day2').html(days[(day+1)%7]);

	    	$('.image3').attr("src",setimage(data.list[15].weather[0].description));
	    	$('#tempmax3').html(Math.ceil(data.list[15].main.temp_max-273)+'&deg;');
	    	$('#tempmin3').html(Math.floor(data.list[15].main.temp_min-273)+'&deg;');
	    	$('#day3').html(days[(day+2)%7]);

	    	$('.image4').attr("src",setimage(data.list[23].weather[0].description));
	    	$('#tempmax4').html(Math.ceil(data.list[23].main.temp_max-273)+'&deg;');
	    	$('#tempmin4').html(Math.floor(data.list[23].main.temp_min-273)+'&deg;');
	    	$('#day4').html(days[(day+3)%7]);

	    	$('.image5').attr("src",setimage(data.list[31].weather[0].description));
	    	$('#tempmax5').html(Math.ceil(data.list[31].main.temp_max-273)+'&deg;');
	    	$('#tempmin5').html(Math.floor(data.list[31].main.temp_min-273)+'&deg;');
	    	$('#day5').html(days[(day+4)%7]);

            
            $('.positioning').show();
	    });
}

function setimage(data){
	if (data=="clear sky") {
	    return "img/day-clearsky.svg";
	}
    else if (data=="few clouds") {
 		return "img/day-few-clouds.svg";
	}
   else if (data=="scattered clouds") {
    	return "img/day-scat-clouds.svg";
    }
    else if (data=="broken clouds") {
    	return "img/day-brok-clouds.svg";
    }
    else if (data=="shower rain") {
    	return "img/gen-showr-rain.svg";
    }
    else if (data=="rain") {
    	return "img/day-rain.svg";
    }
    else if (data=="light rain") {
    	return "img/day-light-rain.svg";
    }
    else if (data=="thunder storm") {
    	return "img/night-thu-storm.svg";
    }
    else if (data=="mist") {
    	return "img/gen-mist.svg";
    }
    else if (data=="snow") {
    	return "img/gen-snow.svg";
    }
    else {
    	return "img/night-drizzle.svg";
    }
}




function sample(){

$('.Search-for-City').keypress(function(event) {
    if (event.which == 13) {
        validate();
        alert("You pressed enter");
     }
});
}