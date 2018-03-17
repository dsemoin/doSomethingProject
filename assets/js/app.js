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

  weather();
  google();

  // Dynamically Generate divs

  var cardList = ['Eat', 'Entertain', 'Learn', 'Exercise']

  var cuisineList = ['American', 'Chinese', 'Mexican', 'Italian',]

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


})





