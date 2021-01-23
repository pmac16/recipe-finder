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
        
        // fetch the current meal by id
        var apiUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + current.idMeal;

        // grab the current meal's recipe and display it
        fetch(apiUrl).then(function (response) {
            if (response.ok) {
                response.json().then(mealDisplay);
            }
        });
    }
};


// display a meal onscreen. (note: random order due to being asynchronous)
var mealDisplay = function (data) {
    var mealName = data.meals[0].strMeal;
    var mealPic = data.meals[0].strMealThumb;
    var mealLink = data.meals[0].strSource; // certain meals don't have one
    
    // ul class
    var singleDisplayEl = document.createElement("a");
    singleDisplayEl.className="collection-item avatar valign-wrapper"
    singleDisplayEl.setAttribute("href", mealLink);
    // li class
    var nameEl = document.createElement("span");
    nameEl.className="title title-change valign-wrapper";
    nameEl.textContent= mealName
    
    //img
    var picEl = document.createElement("img");
    picEl.setAttribute("src", mealPic);
    picEl.style="width:100px;height:100px";
    picEl.classList ="circle portrait";
    // save button
    var saveButton = document.createElement("button");
    saveButton.classList = "secondary-content"
    saveButton.innerHTML="<i class='material-icons'>grade</i>"

    singleDisplayEl.appendChild(picEl);
    singleDisplayEl.appendChild(nameEl); 
    singleDisplayEl.appendChild(saveButton)
    
   
    displayRecipeEl.appendChild(singleDisplayEl);
};


//Drinks section//

/* GLOBAL VARIABLES */
var drinkFormEl = document.querySelector("#drink-form");
console.log(drinkFormEl)
var drinkInputEl = document.querySelector("#drink-search");

/* FUNCTIONS */
// read the value in the input field of drinkFormEl and make an API query
var drinkFormSubmitHandler = function (event) {
    
    // prevent default and grab the text from the input
    event.preventDefault();
    
    var input = drinkInputEl.value.trim();
    console.log(input)
    // replace all spaces with underscores
    input = input.split(' ').join('_');

    // if the input isn't empty, use it to query the drinkdb API
    if (input) {
        drinkAPIQuery(input);
    }
};

// search the drinkdb API by this ingredient, then display the results
var drinkAPIQuery = function (ingredient) {
    console.log(ingredient)
    var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient;
    console.log(apiUrl)
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
        })
    .then (function (data) {
            console.log(data)
        // if the fetch worked, we now have response json.
       // if (response.ok) {
           // response.json().then(function (data) {
                // if there is at least one drink in data, display the drink(s).
                if (data.drinks) {//
                   displayDrinks(data)
                }
           // });
        //}
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
        var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + current.idDrink;

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
    //var drinkLink = data.drinks[0].strSource; // certain drinks don't have one

    var singleDisplayEl = document.createElement("div");

    var nameEl = document.createElement("a");
    nameEl.textContent = drinkName;
    
    //if (drinkLink) {
    //    nameEl.setAttribute("href", drinkLink);
    //}

    var picEl = document.createElement("img");
    picEl.setAttribute("src", drinkPic);

    singleDisplayEl.appendChild(nameEl);
    singleDisplayEl.appendChild(picEl);
    displayRecipeEl.appendChild(singleDisplayEl);
};

/* EVENT LISTENERS */
mealFormEl.addEventListener("submit", mealFormSubmitHandler);
drinkFormEl.addEventListener("submit", drinkFormSubmitHandler);



    // set the mealPic size

    



/* EVENT LISTENERS */
mealFormEl.addEventListener("submit", mealFormSubmitHandler);
/* MAIN CODE */