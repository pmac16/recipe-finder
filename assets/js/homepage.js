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
    var apiUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;

    fetch(apiUrl).then(function (response) {
        // if the fetch worked, we now have response json.
        if (response.ok) {
            response.json().then(function (data) {
                // if there is at least one meal in data, display the meal(s).
                if (data.meals) {
                    displayMeals(data);
                }
            });
        }
    });
};


// display up to ten of the meals in data
// note that the mealdb filter endpoint DOES NOT include the recipes of each meal.
// we need to do another query on each of these meals.
var displayMeals = function (data) {
    // clear displayRecipeEl
    displayRecipeEl.innerHTML = "";

    // stop the loop when ten meals are displayed, or we have displayed all meals
    for (var i = 0; i < 10 && i < data.meals.length; i++) {
        // grab the name and picture of the current meal
        var current = data.meals[i];
        console.log(current);
        var mealName = current.strMeal;
        var mealPic = current.strMealThumb;

        displayMeal(mealName, mealPic);

        var mealLink; // we need to fetch this from the API
        
        /* FIX ME!!!!
        // fetch the current meal by id
        var apiUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + current.idMeal;

        // grab the link to the current meal's recipe and display it
        // NOTE: doesn't work.
        fetch(apiUrl).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    mealLink = data.meals[0].strSource;

                    console.log(mealName, mealPic, mealLink);
                });
            }
        });
        */
    }
};


// TODO: NEED TO FIX LINK GLITCH IN DISPLAYMEALS() BEFORE ADDING LINKS.
// display a meal onscreen (can work for drinks too)
var displayMeal = function (str, pic) {
    var singleDisplayEl = document.createElement("div");

    var nameEl = document.createElement("p");
    nameEl.textContent = str;

    var picEl = document.createElement("img");
    picEl.setAttribute("src", pic);

    singleDisplayEl.appendChild(nameEl);
    singleDisplayEl.appendChild(picEl);
    displayRecipeEl.appendChild(singleDisplayEl);
};


/* EVENT LISTENERS */
mealFormEl.addEventListener("submit", mealFormSubmitHandler);

/* MAIN CODE */