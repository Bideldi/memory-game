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

// Selects the Element with the class .deck and stores it in the variable deck
var deck = $('.deck');

// Creates an array with shuffled symbol classes
var shuffledCardsArray = shuffle(givenCardsArray);

generateDeck();

// Generates the HTML Codes for the cards and append each element to the deck
function generateDeck() {
  for (var num = 0; num < 16; num += 1) {
    $(deck).append('<li class="card"><i class="fa ' + givenCardsArray[num] + '"></i></li>');
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
  if (checkClickedCard(clickedCard) === true) {
    console.log('Nothing to click!')
  } else {
    console.log('A card is clicked!')
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

// Shows the symbol of the card (Adds class open show if the card is clicked)
function showCard(clickedCard) {
  $(clickedCard).addClass('open show');
}

// Wrong Animation
function wrongAnimation() {
  $(openCards[0]).effect( "shake", "slow" );
  $(openCards[1]).effect( "shake", "slow" );
}

// Correct Animation
function correctAnimation() {
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

/* Move Counter, Matched Pair Counter and Stars */
var count = 0;
var starIndex = 0;
var matchedPairCount = 0;

// Function countReset() sets variable count and HTML text back to 0
function countReset() {
  count = 0;
  $('.moves').text(count);
}

// Removes the class remove-star to show 3 black stars
function starsReset() {
  starIndex = 0;
  $('.stars').find('i').each(function(index) {
    $('i').removeClass('remove-star');
  });
}

// Checks how many moves are made, after a certain amount of moves it calls the removeStar function
function starRating() {
  if (count == 1) {
    removeStar(starIndex);
  } else if (count == 2) {
    removeStar(starIndex);
  } else if (count == 3) {
    removeStar(starIndex)
  }
}

// Removes a black star on position (index)
// It adds the css class remove-star which sets the color to #C5BFCB
function removeStar(index) {
  var star = $('.stars').find('i').get(index);
    $(star).addClass('remove-star');
    starIndex += 1;
}

// Adds 1 to the counter after a pair of cards is clicked and display the number in the HTML text
function moveCounter() {
  count += 1;
  $('.moves').text(count);
  starRating();
}

// Checks if the 2 clicked cards stored in the openCards Array do match
// If they match, the function matchedCards is called
// If the don't match the function hideCard is called
function compareCards() {
  preventClick();
  var card1Class = $(openCards[0]).children('i').attr('class').split(' ')[1];
  var card2Class = $(openCards[1]).children('i').attr('class').split(' ')[1];
  if (card1Class == card2Class) {
    correctAnimation();
    setTimeout(function() {
      matchedCards();
      moveCounter();
      winGame();
      openCards = []; // empties the array
      removePreventClick();
    },500);
  } else {
    wrongAnimation();
    setTimeout(function() {
      hideCard();
      moveCounter();
      openCards = [];
      removePreventClick();
    },1000);
    // https://www.sitepoint.com/jquery-settimeout-function-examples/
  }
}

// Function matchedCards ads the class 'match' to the correct cards
// sets a dot before the matched Class like '.'+'fa-leaf' => .fa-leaf
// stores the parent li element from the matched Class to manipulate / add the class match to the element
function matchedCards() {
  $(openCards[0]).addClass('match');
  $(openCards[1]).addClass('match');
}

//
// Prevent Click Event on cards
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
function winGame() {
  matchedPairCount += 1;
  console.log('Pairs matched: ' + matchedPairCount);
  if (matchedPairCount === 8) {
    console.log('Success');
  }
}
// Count all ul li with class match
// If number of matches is === 16 => Display Congratulate HTML Code with how much time and the star rating. Also Ask für Restart the game.


// Empties array, reset move count, stars index to 0,
$('.restart').on('click', function() {
  countReset();
  starsReset();
  matchedPairCount = 0;
  openCards = [];
  $(deck).empty();
  shuffle(givenCardsArray);
  generateDeck();
  console.log(count);
  console.log(starIndex);
  console.log(openCards);
});


// Put in the codeblock a function to call and test it
$('#my-button').on('click', function() {

});

//
/*
 * set up the event listener for a card. If a card is clicked:
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
