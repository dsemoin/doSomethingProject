
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
	widgetDiv.addClass('text-center')
	// use string interpolation to get weather info from api and displays current weather.
	widgetDiv.append("Weather");
	widgetDiv.append(`<div>${Math.round(weatherInfo.main.temp)}&deg;F</div>`);
	widgetDiv.append(`<div>${weatherInfo.weather[0].main} - ${weatherInfo.weather[0].description}</div>`);
	widgetDiv.append(`<div>${weatherInfo.main.humidity}% Humidity</div>`);
	$("#weather").append(widgetDiv);
	console.log(JSON.stringify (widgetDiv));
	}
}