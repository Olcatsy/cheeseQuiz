const app = {};

// variables
const $startCard = $('#startCard');
const $startButton = $('#startButton');
const $q1 = $('#q1');
const $q2 = $('#q2');
const $q3 = $('#q3');
const $q4 = $('#q4');
const $q5 = $('#q5');
const $result = $('#result');
const $restart = $('#restart');


// HELPER FUNCTIONS

// hides the curent card and shows the next one
app.switchCard = (card1, card2) => {
    $(card1).hide();
    $(card2).fadeIn();
};

// shows the result and a corresponding image
app.showResult = (currentCard, html, imgName) => {
    app.switchCard(currentCard, $result);
    $('.result h2').after(`<div class="cheese-img"><img src="./styles/assets/${imgName}.jpg" alt=""></div>`).after(html);
}

app.logMessage = () => {
    console.log('message');
}

// QUIZ LOGIC
app.playQuiz = function() {
    console.log("wowie")
    // goes to the QUESTION 1 - Do you consider yourself a softie?
    app.switchCard($startCard, $q1);

    // listens for a button click, switches cards depending on whether YES or NO is selected
    $('#q1 button').on('click', function() {

        if ($(this).data("choice") === 'yes') {
            // goes to QUESTION 2 - Are you salty?
            app.switchCard($q1, $q2);
            
            $('#q2 button').on('click', function() {
                if ($(this).data('choice') === 'yes') {
                    // goes to QUESTION 3 - Do your friends think you are stinky?
                    app.switchCard($q2, $q3);

                    $('#q3 button').on('click', function() {
                        if($(this).data('choice') === 'yes') {
                            // RESULT: Gorgonzola
                            app.showResult($q3, '<p>You are gorgonzola! A stinky boy!</p>', 'Gorgonzola');

                        } else {
                            // RESULT: Feta
                            app.showResult($q3, '<p>You are feta! Strong and delicous!</p>', 'Feta');
                        };
                    })
                    
                } else {
                    // goest to QUESTION 4 - Are you a crumbly mess?
                    app.switchCard($q2, $q4);

                    $('#q4 button').on('click', function() {
                        if($(this).data('choice') === 'yes') {
                            // RESULT: goat cheese
                            app.showResult($q4, '<p>You are goat cheese! Bheeeee! </p>', 'GoatCheese');

                        } else {
                            // RESULT: brie
                            app.showResult($q4,'<p>You are brie! Good with sweet AND savoury accompaniments! </p>', 'Brie');
                        };
                    });
                };
            });
        } else {
            // goes to question 5
            app.switchCard($q1, $q5);

            $('#q5 button').on('click', function() {
                if ($(this).data('choice') === 'yes') {
                    // RESULT: smoked gouda
                    app.showResult($q5, '<p>You are smoked gouda! Gouda for you! </p>', 'Gouda');

                } else {
                    // RESULT: manchego
                    app.showResult($q5,'<p>You are manchego! A tasty native of Spain!</p>', 'Manchego');
                };
            });
        };
    });
    // End of quiz
};

app.restartQuiz = () => {
    location.reload();
}




app.init = function() {
    $startButton.on('click', app.playQuiz);
    $restart.on('click', app.restartQuiz);
};

$(function() {
   app.init();
});