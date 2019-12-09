// Things to do:
// ✔refactor question cards as an object of objects (?) 
// -make responsive!
// ✔ add recipes with API
// -refactor logic 😥😥😥
// -add diet filter (meat-based or vegetarian)
// -recipes card should only show up on  results reveal

const app = {};

// filter for meat-based or vegetarian diet
// const apiCallDefault = `https://api.edamam.com/search?q=${cheese}&app_id=4b162b07&app_key=656ed04cb31bd5c95520ca0791d403af&&`;
// const apiCallVegetarian = `https://api.edamam.com/search?q=${cheese}&app_id=4b162b07&app_key=656ed04cb31bd5c95520ca0791d403af&&&health=vegetarian`;


// variables for DOM elements
const $startCard = $('#startCard');
const $startButton = $('#startButton');
const $q1 = $('#q1');
const $q2 = $('#q2');
const $q3 = $('#q3');
const $q4 = $('#q4');
const $q5 = $('#q5');
const $result = $('#result');
const $restart = $('#restart');

// stores the result cheese
let cheeseResult = "";

// an object storing results data (name of the cheese, imageURL, text to append)
const cheeses = {
    "gorgonzola": {
        name: 'gorgonzola',
        htmlText: '<p>You are gorgonzola! A stinky boy!</p>',
        imgUrl: "./styles/assets/Gorgonzola.jpg"
    },
    "feta": {
        name: 'feta',
        htmlText: '<p>You are feta! Strong and delicous!</p>',
        imgUrl: "./styles/assets/Feta.jpg"
    },
    "goat-cheese": {
        name: 'goat cheese',
        htmlText: '<p>You are goat cheese! Bheeeee! </p>',
        imgUrl: "./styles/assets/GoatCheese.jpg"
    },
    "brie": {
        name: 'brie',
        htmlText: '<p>You are brie! Good with sweet AND savoury accompaniments! </p>',
        imgUrl: "./styles/assets/Brie.jpg"
    },
    "smoked-gouda": {
        name: 'smoked gouda',
        htmlText: '<p>You are smoked gouda! Gouda for you! </p>',
        imgUrl: "./styles/assets/Gouda.jpg"
    },
    "manchego": {
        name: 'manchego',
        htmlText: '<p>You are manchego! A tasty native of Spain!</p>',
        imgUrl: "./styles/assets/Manchego.jpg"
    },
}


const questions = {
    q1: {
        name: q1,
        yes: q2,
        no: q5
    },
    q2: {
        name: q2,
        yes: q3,
        no: q4
    },
    q3: {
        name: q3,
        yes: result,
        no: result
    },
    q4: {
        name: q4,
        yes: result,
        no: result,
    },
    q5: {
        name: q5,
        yes: result,
        no: result,
    }
};

// HELPER FUNCTIONS

// hides the curent card and shows the next one
app.switchCard = (card1, card2) => {
    $(card1).hide();
    $(card2).fadeIn();
};

// shows the result and a corresponding image
app.showResult = (cheese) => {
    let name = cheeses[cheese].name;
    // console.log(name)
    let img = cheeses[cheese].imgUrl;
    let txt = cheeses[cheese].htmlText;

    $('.result h2').after(`<div class="cheese-img"><img src="${img}" alt="${name}"></div>`).after(txt);
};

// accepts an object returned by the ajax call, and uses it to populate the recipes container with recipe cards
app.populateRecipesContainer = (data) => {
    // an array of returned recipes
    let recipes = data.hits; 
    recipes.forEach(recipe => {
        let recipeName = recipe.recipe.label;
        let recipeImg = recipe.recipe.image;
        let recipeLink = recipe.recipe.url;

        let htmlToAppend = 
        `<div class="recipe">
            <h4>${recipeName}</h4>
            <div>
                <img src="${recipeImg}" alt="${recipeName}" class="recipe-img">
            </div>
            <a href="${recipeLink}" class="recipe-link">Get this recipe</a>
        </div>`;

        $('.recipes-inner').append(htmlToAppend);
    });
};

app.answerQuestion = function(button, currentCard, nextCardYes, nextCardNo) {
    // checks whether yes or no button is pressed
    if (button.data('choice') === 'yes') {
        // displays the next card
        app.switchCard(currentCard, nextCardYes);

        // checks if the result needs to be displayed and if yes, displays it
        if (currentCard === $q3) {
            // RESULT: Gorgonzola
            cheeseResult = 'gorgonzola';
            app.showResult(cheeseResult);
            app.getRecipes(cheeseResult);
        } else if (currentCard === $q4) {
            // RESULT: Goat cheese
            cheeseResult = 'goat-cheese';
            app.showResult(cheeseResult);
            app.getRecipes(cheeseResult);
        } else if (currentCard === $q5) {
            // RESULT: smoked gouda
            cheeseResult = 'smoked-gouda';
            app.showResult(cheeseResult);
            app.getRecipes(cheeseResult);
        }
    } else {
        // displays the next card
        app.switchCard(currentCard, nextCardNo);

        // checks if the result needs to be displayed
        if (currentCard === '$q3') {
            // RESULT: Feta
            cheeseResult = 'feta';
            app.showResult(cheeseResult);
            app.getRecipes(cheeseResult);
        } else if (currentCard === $q4) {
            // RESULT: brie
            cheeseResult = 'brie';
            app.showResult(cheeseResult);
            app.getRecipes(cheeseResult);
        } else if (currentCard === $q5) {
            // RESULT: manchego
            cheeseResult = 'manchego';
            app.showResult(cheeseResult);
            app.getRecipes(cheeseResult);
        }
    }
};

// Restart 
app.restartQuiz = () => {
    location.reload();
};

// AJAX call to get recipes that contain the resulting cheese
app.getRecipes = (cheese) => {
    $.ajax({
        url: `https://api.edamam.com/search?q=${cheese}&app_id=4b162b07&app_key=656ed04cb31bd5c95520ca0791d403af&&`,
        method: "GET",
        dataType: 'json'
    }).then(data => app.populateRecipesContainer(data));
};


// APP INIT
app.init = function() {
    // start the quiz
    $startButton.on('click', function(){
        app.switchCard($startCard, $q1);
    });

    // Answer QUESTION 1 - Do you consider yourself a softie?
    $('#q1 button').on('click', function() {
        app.answerQuestion($(this), $q1, $q2, $q5);
    });

    // Answer QUESTION 2 - Are you salty?
    $('#q2 button').on('click', function() {
        app.answerQuestion($(this), $q2, $q3, $q4);
    });

    // Answer QEUESTION 3 - Do your friends think you are stinky?
    $('#q3 button').on('click', function() {
        app.answerQuestion($(this), $q3, $result, $result);
    });

    // Answer QEUESTION 4 - Are you a crumbly mess?
    $('#q4 button').on('click', function() {
        app.answerQuestion($(this), $q4, $result, $result);
    });
    // Answer QEUESTION 5 - Are you full of delicious smoky flavour?
    $('#q5 button').on('click', function() {
        app.answerQuestion($(this), $q5, $result, $result);
    });

    // restarts the quiz
    $restart.on('click', app.restartQuiz);
    app.getRecipes(cheeseResult);
};

// DOC READY
$(function() {
   app.init();
});