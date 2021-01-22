/* GLOBAL VARIABLES */
var displayRecipeEl = document.querySelector("#display-recipe");
var mealFormEl = document.querySelector("#food-form");
var mealInputEl = document.querySelector("#meal-search");


/* FUNCTIONS */
// read the value in the input field of mealFormEl and make an API query
var mealFormSubmitHandler = function (event) {
    // prevent default and grab the text from the input
    event.preventDefault();
    var input = mealInputEl.value.trim();

    // replace all spaces with underscores
    input = input.split(' ').join('_');

    // if the input isn't empty, use it to query the mealdb API
    if (input) {
        mealAPIQuery(input);
    }
};


// search the mealdb API by this ingredient, then display the results
var mealAPIQuery = function (ingredient) {
    // 1: make the query url and fetch it.
    var apiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;

    fetch(apiUrl)
    .then(function (response) {
        // if the fetch worked, we now have response json.
        // Otherwise, we automatically return null.
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (data) {
        // if data isn't null and there is at least one meal, display the meal(s).
        if (data && data.meals) {
            displayMeals(data);
        }
    });
};


// display up to ten of the meals in data
// note that the mealdb filter endpoint DOES NOT include the recipes of each meal.
// we need to do another query on each of these meals.
var displayMeals = function (data) {
    for (var i = 0; i < 10; i++) {
        var current = data.meals[i];
        console.log(current);
    }
};


/* EVENT LISTENERS */
mealFormEl.addEventListener("submit", mealFormSubmitHandler);

/* MAIN CODE */