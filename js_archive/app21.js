// List of symbol fonts classes
var givenCardsArray = [
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-bomb"
];

var givenCardsArray2 = [
  "fa-car",
  "fa-tree",
  "fa-floppy-o",
  "fa-graduation-cap",
  "fa-heartbeat",
  "fa-html5",
  "fa-gamepad",
  "fa-music",
  "fa-car",
  "fa-tree",
  "fa-floppy-o",
  "fa-graduation-cap",
  "fa-heartbeat",
  "fa-html5",
  "fa-gamepad",
  "fa-music"
]

// Selects the Element with the class .deck and stores it in the variable deck
var deck = $('.deck');

// Creates an array with shuffled symbol classes
var shuffledCardsArray = shuffle(givenCardsArray2);

generateDeck();
$('#timepanel').timer({
  format: '%H:%M:%S'
});

// Generates the HTML Codes for the cards and append each element to the deck
function generateDeck() {
  for (var num = 0; num < 16; num += 1) {
    $(deck).append('<li class="card"><i class="fa ' + shuffledCardsArray[num] + '"></i></li>');
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Main functions if card is clicked
// Call function checkClickedCard, if already clicked nothing is to do
// If card is not already clicked, add class clicked, call showCard and storeOpenCard
$('.card').on('click', function() {
  var clickedCard = this;
  clickAnimation();
  setTimeout(function() {
    if (checkClickedCard(clickedCard) === true) {
      console.log('Please try another card!')
    } else {
      $(clickedCard).addClass('clicked');
      showCard(clickedCard);
      storeOpenCard(clickedCard);
    }
  },100);
});


// Checks if clicked card is already clicked to prevent double click the same card. Checks if the cards have the class preventClick before comparing the two cards.
function checkClickedCard(clickedCard) {
  if ($(clickedCard).hasClass('clicked') || $('.card').hasClass('preventclick')) {
    return true;
  } else {
    return false;
  }
}

// Shows the symbol of the card (Adds class open show if the card is clicked)
function showCard(clickedCard) {
  $(clickedCard).addClass('open show');
}
// !!!! Do I have to add CSS Animations like in the video? What is with the card flip integration?
/* Sounds */
// http://www.noiseforfun.com/
var wrongAudio = new Audio('sounds/NFF-disabled.wav');
var correctAudio = new Audio('sounds/NFF-choice-good.wav');
var clickAudio = new Audio('sounds/NFF-switchy.wav');
var winAudio = new Audio('sounds/NFF-carillon-02-a.wav');

// Animations: https://daneden.github.io/animate.css/

// Click Animation
function clickAnimation() {
  clickAudio.play();
}

// Wrong Animation
function wrongAnimation() {
  wrongAudio.play();
  $(openCards[0]).effect( "shake", "slow" );
  $(openCards[1]).effect( "shake", "slow" );
}

// Correct Animation
function correctAnimation() {
  correctAudio.play();
  $(openCards[0]).effect( "pulsate", "slow" );
  $(openCards[1]).effect( "pulsate", "slow" );
}
// Remove class clicked open show
function hideCard() {
  $(openCards[0]).removeClass('clicked open show');
  $(openCards[1]).removeClass('clicked open show');
}

// Array for open cards
var openCards = [];

function storeOpenCard(clickedCard) {
  if (openCards.length < 1) {
    openCards[0] = clickedCard;
  } else if (openCards.length < 2){
    openCards[1] = clickedCard;
    compareCards();
  }
}

/* Move Counter and Stars */
var count = 0;
var starIndex = 0;
var starCountResult = 3; // For Endresult as number in the HTML Code

// Adds 1 to the counter after a pair of cards is clicked and display the number in the HTML text
function moveCounter() {
  count += 1;
  $('.moves').text(count);
  starRating();
}

// Checks how many moves are made, after the defined number of moves it calls the removeStar function
function starRating() {
  if (count == 16) {
    removeStar(starIndex);
  } else if (count == 25) {
    removeStar(starIndex);
  } else if (count == 30) {
    removeStar(starIndex)
  }
}

// Removes a black star on position (index)
// It adds the css class remove-star which sets the color to #C5BFCB
function removeStar(index) {
  var star = $('.stars').find('i').get(index);
    $(star).addClass('remove-star');
    starIndex += 1;
    starCountResult -= 1;
}

// Function countReset() sets variable count and HTML text back to 0
function countReset() {
  count = 0;
  $('.moves').text(count);
}

// Function starsReset() removes the class remove-star to show 3 black stars
function starsReset() {
  starIndex = 0;
  $('.stars').find('i').each(function(index) {
    $('i').removeClass('remove-star');
  });
}

// Checks if the 2 clicked cards stored in the openCards Array do match
// If they match, the function matchedCards is called
// If the don't match the function hideCard is called
// https://www.sitepoint.com/jquery-settimeout-function-examples/
function compareCards() {
  preventClick();
  var card1Class = $(openCards[0]).children('i').attr('class').split(' ')[1];
  var card2Class = $(openCards[1]).children('i').attr('class').split(' ')[1];
  if (card1Class == card2Class) {
    correctAnimation();
    moveCounter();
    matchedCards();
    setTimeout(function() {
      openCards = []; // empties the array
      removePreventClick();
    },500);
  } else {
    wrongAnimation();
    moveCounter();
    setTimeout(function() {
      hideCard();
      openCards = [];
      removePreventClick();
    },1000);
  }
}

// Function matchedCards ads the class 'match' to the correct cards
// sets a dot before the matched Class like '.'+'fa-leaf' => .fa-leaf
// stores the parent li element from the matched Class to manipulate / add the class match to the element
// counts the matched pairs and if it are 8 pairs call the winGame() function
var matchedPairCount = 0;

function matchedCards() {
  $(openCards[0]).addClass('match');
  $(openCards[1]).addClass('match');
  matchedPairCount += 1;
  if (matchedPairCount === 8) {
    var duration = $('#timepanel').data('seconds');
    var minutes = duration / 60;
    var seconds =
    // https://github.com/walmik/timer.jquery
    setTimeout(function() {
      winGame(duration);
    },1000);
  }
}

// Prevent Click Event on cards !!!!! Maybe it simpler to use toggle Class
// https://api.jquery.com/event.stopimmediatepropagation/
function preventClick() {
  $('.card').each(function( index ) {
    $('.card').addClass('preventclick');
  });
}

// Remove Prevent Click Event on card
function removePreventClick() {
  $('.card').each(function( index ) {
    $('.card').removeClass('preventclick');
  });
}

// Win Game Function
// https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
//https://stackoverflow.com/questions/13806621/setting-a-js-variable-and-using-it-in-html-tag
function winGame(duration) {
  winAudio.play();
  /*var starRatingHTML = '<p>Your Star Rating is: </p>';
  $('.header').text('You Win!');
  $(starRatingHTML).insertAfter('.header-tag');*/

  $('.container').empty();
  $('.container').html(
    `<header>
      <h1>Congratulations! You Won!</h1>
    </header>
    <p>Your moves are: <strong>` + count + `</strong></p>
    <p>Your star rating is: <strong>` + starCountResult + `</strong></p>
    <p>Your time is: <strong>` + duration + `</strong> seconds</p>
    <button type='button' class='restart'>Click here to restart the game!</button>
    <script>
      $('.restart').on('click', function() {
        location.reload();
      });
    </script>
    </section>`
  );
}
// Display Congratulate HTML Code with how much time and the star rating. Also Ask for Restart the game.


// Empties array, reset move count, stars index to 0,
$('.restart').on('click', function() {
  countReset();
  starsReset();
  matchedPairCount = 0;
  openCards = [];
  $(deck).empty();
  shuffle(givenCardsArray);
  generateDeck();
  location.reload(); // https://www.tutorialrepublic.com/faq/how-to-refresh-a-page-with-jquery.php
});

$('.win-button').on('click', function() {
  winGame();
});

// TIMER: http://jquerytimer.com/
//
/*
 * set up the event listener for a card. If a card is clicked:
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
