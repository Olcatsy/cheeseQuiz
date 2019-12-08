// Things to do:
// ✔refactor question cards as an object of objects (?) 
// -make responsive!
// ✔ add recipes with API
// -refactor logic 😥😥😥
// -add diet filter (meat-based or vegetarian)

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
        domSelector: $('#q1'),
        yes: q2,
        no: q5
    },
    q2: {
        name: q2,
        domSelector: $('#q2'),
        yes: q3,
        no: q4
    },
    q3: {
        name: q3,
        domSelector: $('#q3'),
        yes: result,
        no: result
    },
    q4: {
        name: q4,
        domSelector: $('#q4'),
        yes: result,
        no: result,
    },
    q5: {
        name: q5,
        domSelector: $('#q5'),
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
app.showResult = (currentCard, cheese) => {
    app.switchCard(currentCard, $result);
    $('.result h2').after(`<div class="cheese-img"><img src="${cheeses[cheese].imgUrl}" alt="${cheeses[cheese].name}"></div>`).after(cheeses[cheese].htmlText);
};

// QUIZ LOGIC
app.playQuiz = function() {

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
                            cheeseResult = 'gorgonzola'
                            app.showResult($q3, cheeseResult);
                            app.getRecipes(cheeseResult);
                        } else {
                            // RESULT: Feta
                            cheeseResult = 'feta'
                            app.showResult($q3, cheeseResult);
                            app.getRecipes(cheeseResult);
                        };
                    })
                    
                } else {
                    // goest to QUESTION 4 - Are you a crumbly mess?
                    app.switchCard($q2, $q4);

                    $('#q4 button').on('click', function() {
                        if($(this).data('choice') === 'yes') {
                            // RESULT: goat cheese
                            cheeseResult = 'goat-cheese'
                            app.showResult($q4, cheeseResult);
                            app.getRecipes(cheeseResult);

                        } else {
                            // RESULT: brie
                            cheeseResult = 'brie'
                            app.showResult($q4, cheeseResult);
                            app.getRecipes(cheeseResult);
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
                    cheeseResult = 'smoked-gouda'
                    app.showResult($q5, cheeseResult);
                    app.getRecipes(cheeseResult);

                } else {
                    // RESULT: manchego
                    cheeseResult = 'manchego'
                    app.showResult($q5, cheeseResult);
                    app.getRecipes(cheeseResult);
                };
            });
        };
    });
    // End of quiz
};

// Restart button
app.restartQuiz = () => {
    location.reload();
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
            <p>${recipeName}</p>
            <div>
                <img src="${recipeImg}" alt="">
            </div>
            <a href="${recipeLink}">Get this recipe</a>
        </div>`;

        $('.recipes').append(htmlToAppend);
    });
};

// ajax call to get recipes that contain the resulting cheese
app.getRecipes = (cheese) => {
    $.ajax({
        url: `https://api.edamam.com/search?q=${cheese}&app_id=4b162b07&app_key=656ed04cb31bd5c95520ca0791d403af&&`,
        method: "GET",
        dataType: 'json'
    }).then(data => app.populateRecipesContainer(data));
};

app.getVegetarianRecipes = (cheese) => {

}


// APP INIT
app.init = function() {
    $startButton.on('click', app.playQuiz);
    $restart.on('click', app.restartQuiz);
    app.getRecipes(cheeseResult);
};


// DOC READY
$(function() {
   app.init();
});