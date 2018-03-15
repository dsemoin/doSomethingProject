// function google() {
// 	var gQueryUrl = 'https://www.googleapis.com/customsearch/v1?q=&key=AIzaSyDRsx9FnAROae4cLDp1FiJhKYChqD7Bejg';
// 	$.ajax ({
// 	      url: gQueryURL,
// 	      method: "GET"
// 	}).then(function(response) {
// 			console.log(response);

// 			var results = response.data;

// 		})
// }

// google();

var queryURL ='https://www.googleapis.com/customsearch/v1?q=random&key=AIzaSyDRsx9FnAROae4cLDp1FiJhKYChqD7Bejg&cx=010461806356412336508:tcnrljjmcgy';
// var apiKey = "8fa5bed612da59c7d341e2eeefbe2d3f";
//this is to get the api to work
$.ajax({
url: queryURL,
method: "GET"
//this tells javascript to show the response after the ajax call
}).then(function(response) {
console.log(response);
var results = response.data;
});