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
// Stores the <li> element in the variable clickedCard
// Stores the class names in the variable clickedCardClass
// Compares if the card is already clicked via the class names
$('.card').on('click', function() {
  var clickedCard = this;
  var clickedCardClass = $(clickedCard).attr('class');
  if (clickedCardClass === 'card open show' || clickedCardClass === 'card open show match') { // ACHTUNG: wenn card open show match ist, dann gilt die Regel nicht mehr, eventuell bei anderen Regeln auch nicht d.h. klick event wird nicht verhindert bei geoffneten oder matched Karten
    console.log('nothing to click');
  } else {
    console.log('show and store card');
    showCard(this);
    storeOpenCard(this); // ACHTUNG das ist nicht this sondern i class
  }
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
// split(' ')[1] get the second class, example fa-leaf and not fa fa-leaf attention blank space between Anfuehrungszeichen
//https://stackoverflow.com/questions/4239947/how-to-get-the-second-class-name-from-element
function storeOpenCard(clickedCard) {
  var cardClass = $(clickedCard).children('i').attr('class').split(' ')[1];
  console.log(cardClass)
  if (openCards.length < 1) {
    openCards[0] = cardClass;
  } else if (openCards.length < 2){
    openCards[1] = cardClass;
    compareCards();
  }
   console.log(openCards);
}

// Checks if the 2 clicked cards stored in the openCards Array do match
// If they match, the function matchedCards is called
function compareCards() {
  if (openCards[0] == openCards[1]) {
    console.log('They match');
    matchedCards();
  } else {
    console.log('They dont match');
  }
}

// Function matchedCards ads the class 'match' to the correct cards
// sets a dot before the matched Class like '.'+'fa-leaf' => .fa-leaf
// stores the parent li element from the matched Class to manipulate / add the class match to the element
function matchedCards() {
var matchedClass = $('.'+ openCards[0]);
var parentElement = $(matchedClass).parent('li');
$(parentElement).addClass('match');
console.log(parentElement);
// TESTING: All element <i> with class fa-leaf the parent <li> element add Class match


  // var matchedCards = $('li').children('i');
  // $(matchedCards).find('.fa-leaf').parent('li').addClass('match');
  // $(matchCards).addClass('match');
  // console.log('add class match')
  // console.log(openCards[0]);
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
