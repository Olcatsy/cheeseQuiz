$(function() {

// DOM ELEMENTS VARIABLES

const $startCard = $('#startCard');
console.log($startCard);
const $q1 = $('#question1');
const $q2 = $('#question2');
const $q3 = $('#question3');
const $q4 = $('#question4');
const $q5 = $('#question5');
const $yes = $('.yes');
const $no = $('.no');


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

// q1
$('.yes').on('click', function() {
    switchCard($q1, $q2);
}) 

$('.no').on('click', function() {
    switchCard($q1, $q5);
})





}); 