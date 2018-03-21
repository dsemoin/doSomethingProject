// Groupon API | (token auth)
// -----------

// Google API | api key: AIzaSyDRsx9FnAROae4cLDp1FiJhKYChqD7Bejg
// -----------

// Weather API | api key: 8fa5bed612da59c7d341e2eeefbe2d3f
// -----------
  //this displays the results from the api key
  // for(var i = 0; i < results.length; i++) {
  //   var t = $("<div class='item'>");
  //   var p = $("<p>").text("Rating: " + results [i].rating);
  //   var topicImage = $("<img>");
  //   topicImage.attr("src", results[i].images.fixed_height.url);

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB1NNGKvL9KRoL3siEyKCMA0_lKV5xU5Xc",
    authDomain: "dosomethingdb.firebaseapp.com",
    databaseURL: "https://dosomethingdb.firebaseio.com",
    projectId: "dosomethingdb",
    storageBucket: "dosomethingdb.appspot.com",
    messagingSenderId: "473809310213"
  };
  firebase.initializeApp(config);

  var db = firebase.database();

  // weather();
  // google();

  // Dynamically Generate divs

  var cardList = ['Eat', 'Entertain', 'Learn', 'Exercise']

  var cuisineList = ['American', 'Chinese', 'Mexican', 'Italian',]

  var inOrOut  = []

  function generateCards () {
    for (var i = 0; i < cardList.length; i++) {
      newDiv = $('<div>');
      header = $('<h2>');
      newDiv.addClass('card container text-center col-xs-10 col-md-4 col-lg-3 offset-xs-1');
      newDiv.attr('data', cardList[i]);
      header.text(cardList[i]);
      newDiv.append(header);
      $('.card-viewer').append(newDiv)
    }
  }

  generateCards();

// Click event for regenerating cards after click.
$('.card').click(function () {
  $('.card-viewer').empty();

  if ('Eat' === $(this).attr('data')) {
    cardList = cuisineList;
    generateCards(); 
  }
});

$('#start').click(function() {
  $('.card-viewer').removeClass('hidden');
})
weatherWidget();
var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
            console.log(pos);
            // passed pos to get weather based on location
            weather(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
    
    
// initMap();





