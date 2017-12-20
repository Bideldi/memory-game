// Array with css font classes which acts as cards from http://fontawesome.io/
var givenCardsArray = [
  "fa-ambulance",
  "fa-h-square",
  "fa-heartbeat",
  "fa-medkit",
  "fa-stethoscope",
  "fa-wheelchair",
  "fa-hospital-o",
  "fa-user-md",
  "fa-ambulance",
  "fa-h-square",
  "fa-heartbeat",
  "fa-medkit",
  "fa-stethoscope",
  "fa-wheelchair",
  "fa-hospital-o",
  "fa-user-md"
]

/* var givenCardsArray = [
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
]; */

// Selects the element with the class .deck and stores it in the variable deck
var deck = $('.deck');

// Creates an array with shuffled cards
var shuffledCardsArray = shuffle(givenCardsArray);

// Calls the function generateDeck()
generateDeck();

// Generates the HTML code for the cards and append each element to the deck
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

// After the first card is clicked, the timer starts
// The card object is stored in the variable clickedCard
// Function checkClickedCard is called to prevent clicking the same card again
// If card is not already clicked, add class clicked, call functions showCardand storeOpenCard
var firstClickedCard = 0;

$('.card').on('click', function() {
  firstClickedCard += 1;
  startTimer();
  var clickedCard = this;
  if (checkClickedCard(clickedCard) === true) {
    console.log('Please try another card!')
  } else {
    $(clickedCard).addClass('clicked');
    showCard(clickedCard);
    storeOpenCard(clickedCard);
  }
});


// Checks if clicked card is already clicked to prevent double click the same card. Checks if the cards have the class preventClick before comparing the two cards.
function checkClickedCard(clickedCard) {
  if ($(clickedCard).hasClass('clicked') || $('.card').hasClass('preventclick')) {
    return true;
  } else {
    return false;
  }
}

// Prevent Click Event on cards
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

/* Sounds */
// http://www.noiseforfun.com/
var wrongAudio = new Audio('sounds/NFF-disabled.wav');
var correctAudio = new Audio('sounds/NFF-choice-good.wav');
var clickAudio = new Audio('sounds/NFF-switchy.wav');
var winAudio = new Audio('sounds/NFF-carillon-02-a.wav');

/* Animations */
// Source: https://daneden.github.io/animate.css/
$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
              callback();
            }
        });
        return this;
    }
});

// Plays click sound, shows the symbol of the card and animates it
function showCard(clickedCard) {
  clickAudio.play();
  $(clickedCard).addClass('open show');
  $(clickedCard).animateCss('flipInY');
}

// Plays wrong sound, wrong animation and hides the cards symbol
function hideCard() {
  wrongAudio.play();
  $(openCards[0]).animateCss('shake');
  $(openCards[1]).animateCss('shake');
  $(openCards[0]).removeClass('clicked open show');
  $(openCards[1]).removeClass('clicked open show');
}

// Play correct sound and correct animation
function correctCards() {
  correctAudio.play();
  $(openCards[0]).animateCss('tada');
  $(openCards[1]).animateCss('tada');
}

// Array for open cards
var openCards = [];

// Stores the card object in the array. If theres already a card object on the first position, it's stores the object in the second position.
// Calls the functions preventClick and compareCards after two card objects are stored in the array.
function storeOpenCard(clickedCard) {
  if (openCards.length < 1) {
    openCards[0] = clickedCard;
  } else if (openCards.length < 2){
    openCards[1] = clickedCard;
    preventClick();
    compareCards();
  }
}

// Checks if the 2 clicked cards stored in the openCards Array do match
// To prevent calling functions inside an animation, the setTimeout function is used
function compareCards() {
  var card1Class = $(openCards[0]).children('i').attr('class').split(' ')[1];
  var card2Class = $(openCards[1]).children('i').attr('class').split(' ')[1];
  if (card1Class == card2Class) {
    setTimeout(function() {
      correctCards();
      moveCounter();
      matchedCards();
      setTimeout(function() {
        openCards = [];
        removePreventClick();
      },1000);
    },1500);
  } else {
    moveCounter();
    setTimeout(function() {
      hideCard();
      setTimeout(function() {
        openCards = [];
        removePreventClick();
      },1000);
    },1500);
  }
}

// Adds the class match to the matched cards and adds 1 two the matchedPairCount
// If the machtedPairCount is 8 then the stopTimer function is called. The elapsed seconds are stored in the var elapsedTime. The seconds are transformed to the 00:00:00 format in the fancyTimeFormat function
// the winGame function is called after 1 second delay
var matchedPairCount = 0;

function matchedCards() {
  $(openCards[0]).addClass('match');
  $(openCards[1]).addClass('match');
  matchedPairCount += 1;
  if (matchedPairCount === 8) {
    stopTimer();
    var elapsedTime = $('#timepanel').data('seconds');
    var duration = fancyTimeFormat(elapsedTime);
    setTimeout(function() {
      winGame(duration);
    },1000);
  }
}

/* Move Counter and Stars */
var moveCount = 0;
var starIndex = 0;
var starCountResult = 3; // For endresult as number in the HTML Code

// Adds 1 to the counter after a pair of cards is clicked and display the number in the HTML text
// Calls function starRating()
function moveCounter() {
  moveCount += 1;
  $('.moves').text(moveCount);
  starRating();
}

// Checks how many moves are made. After the defined number of moves it calls the removeStar function
function starRating() {
  if (moveCount == 16) {
    removeStar(starIndex);
  } else if (moveCount == 25) {
    removeStar(starIndex);
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

// Function moveCountReset() sets variable moveCount and HTML text back to 0
function moveCountReset() {
  moveCount = 0;
  $('.moves').text(moveCount);
}

// Function starsReset() removes the class remove-star to show 3 black stars
function starsReset() {
  starIndex = 0;
  $('.stars').find('i').each(function(index) {
    $('i').removeClass('remove-star');
  });
}

/* Timer */
// Starts timer after the first clicked card.
// https://github.com/walmik/timer.jquery
function startTimer() {
  if (firstClickedCard == 1) {
    $('#timepanel').timer({
      format: '%H:%M:%S'
    });
  }
}

// Stops timer
function stopTimer() {
  $('#timepanel').timer('pause');
}

// Converts seconds into s or s + m or s + m + h
// https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
function fancyTimeFormat(time)
{
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

// Win Game Function
// Plays winner sound, empties the element with the class container and adds the new html code to the page. https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
//https://stackoverflow.com/questions/13806621/setting-a-js-variable-and-using-it-in-html-tag
function winGame(duration) {
  winAudio.play();

  $('.container').empty();
  $('.container').html(
    `<header>
      <h1>Congratulations! You Won!</h1>
    </header>
    <p>Your moves are: <strong>` + moveCount + `</strong></p>
    <p>Your star rating is: <strong>` + starCountResult + `</strong></p>
    <p>Your time is: <strong>` + duration + `</strong></p>
    <button type='button' class='restart'>Click here to restart the game!</button>
    <script>
      $('.restart').on('click', function() {
        location.reload();
      });
    </script>
    </section>`
  );
}

// calls functions moveCountReset, starsReset, sets variables firstClickedCard and matchedPairCount to 0, empties openCards Array. Empties HTML deck, shuffles the given cards and generates the deck, refreshes the page.
$('.restart').on('click', function() {
  moveCountReset();
  starsReset();
  firstClickedCard = 0;
  matchedPairCount = 0;
  openCards = [];
  $(deck).empty();
  shuffle(givenCardsArray);
  generateDeck();
  location.reload(); // https://www.tutorialrepublic.com/faq/how-to-refresh-a-page-with-jquery.php
});

// Code for testing the winGame() function
/* $('.win-button').on('click', function() {
  winGame();
}); */
