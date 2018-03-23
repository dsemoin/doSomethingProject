$(document).ready(function () {

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

    promise.catch(function(e) {

      console.log(e.message);
      console.log(e);
      $('#error').removeClass('d-none');
      $('#password').val('');
    });



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
      console.log('signed in');
      $('#sign-up').hide();
      $('#sign-up').addClass('hidden');
      $('#log-in').hide();
      $('#start').removeClass('hidden');
      $('#start').show();
      $('#start').removeClass('d-none')
      $('.modal-form').hide();
      $('.login-success').removeClass('d-none');
      $('.login-success').show();
      $('#login-btn').hide();
      $('#password').val('');
      $('#email').val('');
      $('#signup-btn').hide
      $('#logOut').show();
      $('#error').addClass('d-none');
    }
    else {
      console.log('not logged in');
      $('.modal-form').show();
      $('.login-success').hide();
      $('#logOut').hide();

    }
  });

  $('#log-in').click(function () {
    $('#signup-btn').hide();
    $('#login-btn').show();

  });

  $('#sign-up').click(function() {
    $('#signup-btn').show();
    $('#login-btn').hide();
  })

  $('.modal-closer').click(function() {
    $('#email').val('');
    $('#password').val('');
    $('#error').addClass('d-none');
  });
// ---------------------------------------------------------------------
// Log Out
// ---------------------------------------------------------------------
  $('#logOut').click(function (){
    firebase.auth().signOut();
    $('#start').addClass('d-none');
    $('#log-in').show();
    $('#sign-up').show();
    $('#sign-up').removeClass('hidden');
    $('#map').hide();
    $('.card').hide();
    $('.question').hide();
    $('#go-back').hide();
    cardList = getStarted;
    generateCards();
    $('.card-viewer').hide();
  });


// =============================================================================
// Dynamically Generate divs
// =============================================================================

var data = '';

var current = '';

var cardList = ['Food', 'Entertainment', 'Fitness'];

var getStarted = cardList;

var obj = {

'Food':['American', 'Asian', 'Latin', 'Italian'],

'Entertainment': ['Movies', 'Clubs', 'Events'],

'Fitness': ['Gym', 'Park', 'Sports', 'Martial-Arts']
};
//Dynamic Div Generator With Data Attr and ID
function generateCards () {
      for (var i = 0; i < cardList.length; i++) {
        var newDiv = $('<div>');
        var header = $('<h3>');
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
        var item = $(this).attr('data');
        if (obj[item] !== undefined) {
          for (var i = 0; i < cardList.length; i++) {
            if (cardList[i] === item) {
              
              cardList = obj[cardList[i]];
              data = item;
              generateCards(); 
              $('#go-back').removeClass('hidden');
              $('.backCard').show();
              $('#map').show();

              current += data;
        
                
              // Function for Second Card Menu
              if (obj[cardList[i]] === undefined) {
              initMap();
              
              }
            }
          }
        }  

        else {
          item += ' ' + current;
          console.log(item);
          data = item;
          initMap();
        }
    });
}
generateCards();
// -----------------------------------------------------------------
// Go Back Button Function
// -----------------------------------------------------------------

$('.backCard').click(function () {
  $('.card-viewer').empty();
  $('#go-back').addClass('hidden');
  $('#map').hide();
  cardList = getStarted;
  generateCards();
  current = '';
  data = '';
});

$('#start').click(function() {
  $('.card-viewer').removeClass('hidden');
  $('.card-viewer').removeClass('d-none');
  $('.card-viewer').show();
  $('.question').removeClass('hidden');
  console.log(cardList);
  $('#start').hide();
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

        console.log("Locating Places");


        //Finds location of places nearby using 'name'
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pos,
          radius: 8046,
          name: data
        }, callback);

        console.log("Grabbing Weather");
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
        service = new google.maps.places.PlacesService(map);
        service.getDetails({
          placeId: results[i].place_id
        }, createMarker)
      }
    }
  }

  // Creates Markers based on place
  function createMarker(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log(place);
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function() {
        var phone, website;
        if (place.formatted_phone_number) {
          phone = `<p>${place.formatted_phone_number}</p>`;
        } else {
          phone = '';
        }
        if (place.website) {
          website = place.website;
        } else {
          website = place.url;
        }
        infoWindow.setContent(`
        <p><strong>${place.name}</strong></p>
          ${place.adr_address}
          ${phone}
        <span><a href="${website}" target='_blank'>${website}</a></span>
          `);
        infoWindow.open(map, this);
      });
    }
  }
  
  $('#map').hide();

})
