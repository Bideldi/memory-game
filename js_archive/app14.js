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

// Generates the HTML Codes for the cards and append each element to the deck
for (var num = 0; num < 16; num += 1) {
  $(deck).append('<li class="card"><i class="fa ' + givenCardsArray[num] + '"></i></li>');
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
    console.log('nothing to click');
  } else {
    $(clickedCard).addClass('clicked');
    console.log('show and store card');
    showCard(clickedCard);
    storeOpenCard(clickedCard);
  }
});


// Checks if clicked card is already clicked to prevent double click the same card
function checkClickedCard(clickedCard) {
  if ($(clickedCard).hasClass('clicked')) {
    return true;
  } else {
    return false;
  }
}

// Shows the symbol of the card (Adds class open show if the card is clicked)
function showCard(clickedCard) {
  console.log('showCard() is called');
  $(clickedCard).addClass('open show');
  // $(clickedCard).effect( "bounce", "slow"); not working, second card won't show symbol, but why?
}

// Wrong Animation
function wrongAnimation() {
  console.log('wrongAnimation() is called');
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
  console.log('hideCard() is called');
  $(openCards[0]).removeClass('clicked open show');
  $(openCards[1]).removeClass('clicked open show');
}

// Array for open cards
var openCards = []

function storeOpenCard(clickedCard) {
  if (openCards.length < 1) {
    openCards[0] = clickedCard;
  } else if (openCards.length < 2){
    openCards[1] = clickedCard;
    console.log(openCards);
    compareCards();
  }
}

// moveCounter()
// https://api.jquery.com/nth-child-selector/
var count = 0;
function moveCounter() {
  count += 1;
  console.log('Counter :' + count)
  $('.moves').text(count);
  if (count == 1) {
    var star1 = $('.stars').find('i').get(0)
    $(star1).addClass('remove_star');
  } else if (count == 2){
    var star2 = $('.stars').find('i').get(1)
    $(star2).addClass('remove_star');
  } else if (count == 3) {
    var star3 = $('.stars').find('i').get(2)
    $(star3).addClass('remove_star');
  }
}

// Checks if the 2 clicked cards stored in the openCards Array do match
// If they match, the function matchedCards is called
// If the don't match the function hideCard is called
function compareCards() {
  var card1Class = $(openCards[0]).children('i').attr('class').split(' ')[1];
  var card2Class = $(openCards[1]).children('i').attr('class').split(' ')[1];
  if (card1Class == card2Class) {
    console.log('They match');
    correctAnimation();
    matchedCards();
    moveCounter();
    openCards = [] // empties the array
  } else {
    console.log('They dont match');
    wrongAnimation();
    hideCard();
    moveCounter();
    openCards = [] // empties the array
  }
}

// Function matchedCards ads the class 'match' to the correct cards
// sets a dot before the matched Class like '.'+'fa-leaf' => .fa-leaf
// stores the parent li element from the matched Class to manipulate / add the class match to the element
function matchedCards() {
  $(openCards[0]).addClass('match');
  $(openCards[1]).addClass('match');
}

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
