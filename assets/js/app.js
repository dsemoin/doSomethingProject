// Groupon API | (token auth)
// -----------

// Google API | api key: AIzaSyDRsx9FnAROae4cLDp1FiJhKYChqD7Bejg
// -----------

// Weather API | api key: 8fa5bed612da59c7d341e2eeefbe2d3f
// -----------


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

  // Login Functionality

  const txtEmail = $('#email');
  const txtPassword = $('#password');
  const login = $('#login-btn');
  const signUp = $('#signup-btn');

  login.click(function () {

    const email = txtEmail.val();
    console.log(email);
    const pass = txtPassword.val();
    console.log(pass)
    const auth = firebase.auth();
    console.log(auth)

    const promise = auth.signInWithEmailAndPassword(email, pass);

    promise.catch(e => console.log(e.message));
  });

  signUp.click(function () {

    const email = txtEmail.val();
    console.log(email);
    const pass = txtPassword.val();
    console.log(pass)
    const auth = firebase.auth();
    console.log(auth)

    const promise = auth.createUserWithEmailAndPassword(email, pass);

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

  // weather();
  // google();

  // Dynamically Generate divs

  var cardList = ['Food', 'Entertainment', 'Activities']

  var cuisineList = ['American', 'Chinese', 'Mexican', 'Italian',]

  var entertainList = ['Events', 'Movies', 'Dancing']

  var activityList = ['Park', 'Zoo', ]

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

$('#sign-up').click(function() {
  $('#mod-head').text('Sign Up');
  $('#login-btn').addClass('hidden');
  $('#signup-btn').removeClass('hidden');

})

$('#log-in').click(function() {
  $('#mod-head').text('Log In');
  $('#login-btn').removeClass('hidden');
  $('#signup-btn').addClass('hidden');
})

// Map
var map, infoWindow, pos;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 14
        });

        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("You're Here.");
            infoWindow.open(map);
            map.setCenter(pos);


            //Finds location of places nearby
            var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pos,
          radius: 1000,
          type: ['gym']
        }, callback);



          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

    }

    //Function to Call Markers based on results
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

weather();





