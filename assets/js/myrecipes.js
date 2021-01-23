/* GLOBAL VARIABLES */
recipeListEl = document.querySelector("#recipe-list");
var displayRecipeEl = document.querySelector("#display-recipe");
var drinkFormEl = document.querySelector("drink-form");
var drinkInputEl = document.querySelector("#drink-search");

/* FUNCTIONS */
// read the value in the input field of drinkFormEl and make an API query
var drinkFormSubmitHandler = function (event) {
    // prevent default and grab the text from the input
    event.preventDefault();
    var input = drinkInputEl.value.trim();

    // replace all spaces with underscores
    input = input.split(' ').join('_');

    // if the input isn't empty, use it to query the drinkdb API
    if (input) {
        drinkAPIQuery(input);
    }
};

// search the drinkdb API by this ingredient, then display the results
var drinkAPIQuery = function (ingredient) {
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + ingredient;

    fetch(apiUrl).then(function (response) {
        // if the fetch worked, we now have response json.
        if (response.ok) {
            response.json().then(function (data) {
                // if there is at least one drink in data, display the drink(s).
                if (data.drinks) {
                    displayDrinks(data);
                }
            });
        }
    });
};

// display up to ten of the drinks in data
// note that the drinkdb filter endpoint DOES NOT include the recipes of each drink.
// we need to do another query on each of these meals.
var displayDrinks = function (data) {
    // clear displayRecipeEl
    displayRecipeEl.innerHTML = "";

    // stop the loop when ten drinks are displayed, or we have displayed all drinks
    for (var i = 0; i < 10 && i < data.drinks.length; i++) {
        // grab the name and picture of the current meal
        var current = data.drinks[i];
        
        // fetch the current drink by id
        var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + current.idDrink;

        // grab the current drink recipe and display it
        fetch(apiUrl).then(function (response) {
            if (response.ok) {
                response.json().then(drinkDisplay);
            }
        });
    }
};

// display a drink onscreen. (note: random order due to being asynchronous)
var drinkDisplay = function (data) {
    var drinkName = data.drinks[0].strDrink;
    var drinkPic = data.drinks[0].strDrinkThumb;
    var drinkLink = data.drinks[0].strImageSource; // certain drinks don't have one

    var singleDisplayEl = document.createElement("div");

    var nameEl = document.createElement("a");
    nameEl.textContent = drinkName;
    
    if (drinkLink) {
        nameEl.setAttribute("href", drinkLink);
    }

    var picEl = document.createElement("img");
    picEl.setAttribute("src", drinkPic);

    singleDisplayEl.appendChild(nameEl);
    singleDisplayEl.appendChild(picEl);
    displayRecipeEl.appendChild(singleDisplayEl);
};
/* EVENT LISTENERS */
drinkFormEl.addEventListener("submit", drinkFormSubmitHandler);
/* MAIN CODE */