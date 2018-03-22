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

// ============================================================================
// Login Functionality
// ============================================================================

  var txtEmail = $('#email');
  var txtPassword = $('#password');
  var login = $('#login-btn');
  var signUp = $('#signup-btn');

  login.click(function logIn() {

    var email = txtEmail.val();
    
    var pass = txtPassword.val();
   
    var auth = firebase.auth();
  

    var promise = auth.signInWithEmailAndPassword(email, pass);

    promise.catch(e => console.log(e.message));
  });

  signUp.click(function signUpfx() {

    var email = txtEmail.val();
    
    var pass = txtPassword.val();
    
    var auth = firebase.auth();
   

    var promise = auth.createUserWithEmailAndPassword(email, pass);

    promise.catch(e => console.log(e.message));
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser){
      console.log(firebaseUser);
      $('#sign-up').hide();
      $('#log-in').hide();
      $('#start').removeClass('hidden');
    }
    else {
      console.log('not logged in');
    }
  });
// ---------------------------------------------------------------------
// Log Out
// ---------------------------------------------------------------------
  $('#logOut').click(function (){
  firebase.auth().signOut();
  $('#start').addClass('d-none');
  $('#log-in').show();
  $('#sign-up').show();
  $('#map').hide();
  $('.card').hide();
  $('.question').hide();
});


// =============================================================================
// Dynamically Generate divs
// =============================================================================

var myVar = [""];

var current = '';

var cardList = ['Food', 'Entertainment', 'Fitness'];

var getStarted = cardList;

var obj = {

'Food':['American', 'Asian', 'Mexican', 'Italian'],

'Entertainment': ['Events', 'Movies', 'Club'],

'Fitness': ['Park', 'Zoo', 'Gym', 'Martial Arts']
};
//Dynamic Div Generator With Data Attr and ID
function generateCards () {
      for (var i = 0; i < cardList.length; i++) {
        newDiv = $('<div>');
        header = $('<h3>');
        newDiv.addClass('card container text-center col-xs-6 col-md-3 col-lg-3 offset-xs-1');
        newDiv.attr('data', cardList[i]);
        newDiv.attr('id', cardList[i]);
        header.text(cardList[i]);
        newDiv.append(header);
        $('.card-viewer').append(newDiv)
      }
      //Click Function for Cards
      $('.card').click(function () {
        $('.card-viewer').empty();
        for (var i = 0; i < cardList.length; i++) {
          if (cardList[i] === $(this).attr('data')) {
            console.log(cardList[i]);
            cardList = obj[cardList[i]];
            console.log(cardList);
            myVar = $(this).attr('data');
            generateCards(); 
            $('#go-back').removeClass('hidden');
            $('#map').show();

            // Function for Second Card Menu
            if (obj[cardList[i]] === undefined) {
            initMap();
            
            }
          }
        }
    });
}
generateCards();
// -----------------------------------------------------------------
// Go Back Button Function
// -----------------------------------------------------------------

$('.backCard').click(function () {
  $('.card-viewer').empty();
  $('.backCard').hide();
  $('#map').hide();
  cardList = getStarted;
  generateCards();
});

$('#start').click(function() {
  $('.card-viewer').removeClass('hidden');
  $('.question').removeClass('hidden');
})

//=============================================================================
// Map
// ============================================================================
  var map, infoWindow, pos, service;

  var positionRecieved = function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("You're Here.");
        infoWindow.open(map);
        map.setCenter(pos);


        //Finds location of places nearby using 'name'
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pos,
          radius: 3218,
          name: myVar
        }, callback);


        weather(pos);
      }
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 12
    });

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        positionRecieved(pos); 
      }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  //Function to Call Markers based on results
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }
  // DOES NOT WORK
  function yourMarker() {
          var yourLoc = pos;
          var marker = new google.maps.Marker({
            map:map,
            position: pos
          });
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent("YOU");
            infoWindow.open(map, this);
          });
        };

  // 20 Results for Places
  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  // Creates Markers based on place
  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
    });
  }

  $('#map').hide();



