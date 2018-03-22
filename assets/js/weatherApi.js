
function weather(pos) {
	var queryURL =`https://api.openweathermap.org/data/2.5/forecast?lat=${pos.lat}&lon=${pos.lng}&APPID=8fa5bed612da59c7d341e2eeefbe2d3f&units=imperial`;
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
function weatherWidget(results) {
	if(typeof(results) !== 'undefined') {
	var weatherInfo = results.list[results.list.length - 1];
	console.log(weatherInfo);
	var widgetDiv = $("<div>");
	widgetDiv.attr({
		class: "widget",
		id : "weatherWidget"
	})
	widgetDiv.addClass('text-center')
	// use string interpolation to get weather info from api and displays current weather.
	widgetDiv.append("Weather");
	widgetDiv.append(`<div>${Math.round(weatherInfo.main.temp)}&deg;F</div>`);
	widgetDiv.append(`<div>${weatherInfo.weather[0].main} - ${weatherInfo.weather[0].description}</div>`);
	widgetDiv.append(`<div>${weatherInfo.main.humidity}% Humidity</div>`);
	widgetDiv.appendTo($("#weather"));
	console.log(JSON.stringify (widgetDiv));
	}
}