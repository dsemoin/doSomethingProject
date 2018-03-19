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
function weather(pos) {
	var queryURL =`https://api.openweathermap.org/data/2.5/forecast?lat=${pos.lat}&lon=${pos.lng}&APPID=8fa5bed612da59c7d341e2eeefbe2d3f`;
	var apiKey = "8fa5bed612da59c7d341e2eeefbe2d3f";
	//this is to get the api to work
	$.ajax({
	url: queryURL,
	method: "GET"
	//this tells javascript to show the response after the ajax call
	}).then(function(response) {
	
	var results = response.data;
	console.log(response);
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