function weather(pos) {
	var queryURL =`https://api.openweathermap.org/data/2.5/weather?lat=${pos.lat}&lon=${pos.lng}&APPID=8fa5bed612da59c7d341e2eeefbe2d3f&units=imperial`;
	var apiKey = "8fa5bed612da59c7d341e2eeefbe2d3f";
	//this is to get the api to work
	$.ajax({
	url: queryURL,
	method: "GET"
	//this tells javascript to show the response after the ajax call
	}).then(function(response) {
	
	var results = response.data;
	console.log(response);
	weatherWidget(response);

	});

}
// change weatherWidget function to get more accurate data. Change the 'forecast' to 'weather' in the queryURL. Added line 22 to undo duplicate.
function weatherWidget(weatherInfo) {
	if(typeof(weatherInfo) !== 'undefined') {
		$("#weather").empty();
	console.log(weatherInfo);
	var widgetDiv = $("<div>");
	widgetDiv.attr({
		class: "widget container-flud",
		id : "weatherWidget"
	})

	var imgSrc;

	var icon = 'assets/images/weatherImages/';

	var imgNum = weatherInfo.weather[0].icon

	if (imgNum[2] = 'n') {
		widgetDiv.css({"background-image": "url('assets/images/weatherImages/night.jpg')", "color": "white"});
		
	}

	else if (imgNum[2] = 'd') {
		widgetDiv.css('background-image', "url('assets/images/weatherImages/clouds.png')");
	}

	if (imgNum === '01d') {
		imgSrc = 'sunny.png'
		icon += imgSrc;
	}

	else if (imgNum === '01n') {
		imgSrc = 'clearmoon.png'
		icon += imgSrc;
	}

	else if ((imgNum === '02d') || (imgNum === '03d')) {
		imgSrc = 'sunnycloudy';
		icon += imgSrc
	}


	else if ((imgNum === '02n') || (imgNum === '03n')) {
		imgSrc = 'cloudmoon.png'
		icon += imgSrc;
	}

	else if ((imgNum === '04n') || (imgNum === '04d')) {
		imgSrc = 'cloudy.png'
		icon += imgSrc;
	}

	else if ((imgNum === '09n') || (imgNum === '09d')) {
		imgSrc = 'rainshowers';
		icon += imgSrc;
	}

	else if (imgNum === '10d') {
		imgSrc = 'rainsun';
		icon += imgSrc;
	}
	else if (imgNum === '10n') {
		imcSrc = 'rainnight'
		icon += imgSrc;
	}

	else if (imgNum === '11n' || imgNum === '11d') {
		imgSrc = 'thunderstorm.png';
		icon += imgSrc;
	}
	// widgetDiv.addClass('text-center')
	// use string interpolation to get weather info from api and displays current weather.
	var imgDiv = $('<img>')
	imgDiv.attr({
		id: 'weIcon',
		src: icon,
	})
	widgetDiv.append($('<h4 class="weItem">Weather:</h4>'));
	widgetDiv.append(imgDiv);
	widgetDiv.append(`<h4 class='weItem'>${weatherInfo.weather[0].main} - ${weatherInfo.weather[0].description}</h4>`);
	widgetDiv.append(`<h4 class='weItem'>${Math.round(weatherInfo.main.temp)}&deg;F</h4>`);
	widgetDiv.append(`<h4 class='weItem'>${weatherInfo.main.humidity}% Humidity</h4>`);
	$("#weather").append(widgetDiv);
	console.log(JSON.stringify (widgetDiv));
	}
}