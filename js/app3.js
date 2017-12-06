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

var openCards = []



// If a card is clicked: display the card's symbol. Maybe with toggle() method?
$('.card').on('click', function showCard() {
  $(this).addClass('match');
  //storeOpenCards();
});

// Gets the class of the clicked card and stores the opened card in the array openCards
/*function storeOpenCards() {

}*/

//
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
