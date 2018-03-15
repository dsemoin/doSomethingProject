// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyB1NNGKvL9KRoL3siEyKCMA0_lKV5xU5Xc",
//     authDomain: "dosomethingdb.firebaseapp.com",
//     databaseURL: "https://dosomethingdb.firebaseio.com",
//     projectId: "dosomethingdb",
//     storageBucket: "dosomethingdb.appspot.com",
//     messagingSenderId: "473809310213"
//   };
//     firebase.initializeApp(config);
//   console.log(firebase);

//   var database = firebase.database();
//   api keys
function weather() {
	var queryURL ="http://api.openweathermap.org/data/2.5/forecast?zip=33132&APPID=8fa5bed612da59c7d341e2eeefbe2d3f";
	var apiKey = "8fa5bed612da59c7d341e2eeefbe2d3f";
	//this is to get the api to work
	$.ajax({
	url: queryURL,
	method: "GET"
	//this tells javascript to show the response after the ajax call
	}).then(function(response) {
	console.log(response);
	var results = response.data;
	});

}


//  //  create for loop function to create buttons
//  topics.forEach(function(topic){
//     var newButton = $("<button/>",  
//     {
//         text: topic,
//         class: 'btn btn-primary topic',
//         //gives an attribute to use in Ajax call
//         "data-name": weather
//     });
//     $("#buttons").append(newButton);
//     });

    // used google map api to get 