// List of fonts class names
var givenCardsArray = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bomb"
];

// Selects the Element with the class .deck and stores it in the variable deck
var deck = $('.deck');

// Creates an array with shuffled symbol classes
var shuffledCardsArray = shuffle(givenCardsArray);

// Generates the HTML Codes for the cards and append each element to the deck
for (var num = 0; num < 16; num += 1) {
  $(deck).append('<li class="card"><i class="' + givenCardsArray[num] + '"></i></li>');
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

// If a card is clicked: display the card's symbol.
$('.card').on('click', function() {
  showCard(this);
  storeOpenCard(this); // ACHTUNG das ist nicht this sondern i class
});

// Shows the symbol of the card (Adds class open show if the card is clicked)
function showCard(clickedCard) {
  $(clickedCard).addClass('open show');
}

// Array for open cards
var openCards = []

// Stores the class from the card which was clicked
// If theres no element in the array, the class get stored in the first position
// If theres already one element stored in the array, the class get stored in the second position
function storeOpenCard(clickedCard) {
  var cardClass = $(clickedCard).children('i').attr('class');
  if (openCards.length < 1) {
    openCards[0] = cardClass;
  } else if (openCards.length < 2){
    openCards[1] = cardClass;
    compareCards();
  }
  console.log(openCards);
}

// ?????Maybe we can set a class if the element is clicked, if the class is there, if the element is clicked, preventClick()??????? But this is open show. If open show?
// Maybe I have to put in the whole element clickedCard in to the array openCards
// und danach das ganze auseinandernehmen mit childre('i').attr('class');
// because with that I can prevent to click the same element <li> again which get stored in the array?
/*
$(element).click(function(event) {
  event.preventDefault();
});
 */

// Checks if the 2 clicked cards stored in the openCards Array do match
function compareCards() {
  if (openCards[0] == openCards[1]) {
    console.log('They match');
    // lock the cards in the open position how and for what?
  } else {
    console.log('They dont match');
  }
}
//
/*
 * set up the event listener for a card. If a card is clicked:
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
