$(function() {

// DOM ELEMENTS VARIABLES

const $startCard = $('#startCard');
const $q1 = $('#q1');
const $q2 = $('#q2');
const $q3 = $('#q3');
const $q4 = $('#q4');
const $q5 = $('#q5');
const $yes = $('.yes');
const $no = $('.no');
const $result = $('#result');


// OTHER VARIABLES



// HELPER FUNCTIONS

// hides the curent card and shows the next one
const switchCard = (card1, card2) => {
    $(card1).hide();
    $(card2).show();
};


// LOGIC

// Start the quiz! 
$('#start').on('click',function() {
    switchCard($startCard, $q1);
})

// q1 - Do you consider yourself a softie?
$('#q1 .yes').on('click', function() {
    switchCard($q1, $q2);
}) 

$('#q1 .no').on('click', function() {
    switchCard($q1, $q5);
})

// q2 - Are you salty?
$('#q2 .yes').on('click', () => {
    switchCard($q2, $q3);
})

$('#q2 .no').on('click', () => {
    switchCard($q2, $q4);
})

// q3 - Do your friends think you are stinky?
$('#q3 .yes').on('click', () => {
    switchCard($q3, $result);
    // Result: Gorgonzola
    $result.append('<p>You are gorgonzola! A stinky boy!</p>');
})


$('#q3 .no').on('click', () => {
    switchCard($q3, $result);
    // Result: Feta
    $result.append('<p>You are feta! Strong and delicous!</p>');
})

// q4 - Are you a crumbly mess
$('#q4 .yes').on('click', () => {
    switchCard($q4, $result);
    // Result: goat cheese
    $result.append('<p>You are goat cheese! Bheeeee! </p>')
})

$('#q4 .no').on('click', () => {
    switchCard($q4, $result);
    // Result: brie
    $result.append('<p>You are brie! Good with sweet AND savoury accompaniments! </p>');
})

// q5 - Are you full of delicious smoky flavour?
$('#q5 .yes').on('click', () => {
    switchCard($q5, $result);
    // Result: smoked gouda
    $result.append('<p>You are smoked gouda! Gouda for you! </p>');
})

$('#q5 .no').on('click', () => {
    switchCard($q5, $result);
    // Result: manchego
    $result.append('<p>You are manchego! A tasty native of Spain!</p>');
})




}); 