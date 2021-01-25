/* GLOBAL VARIABLES */
var displayRecipeEl = document.querySelector("#display-recipe");
var mealFormEl = document.querySelector("#food-form");
var mealInputEl = document.querySelector("#meal-search");
var drinkFormEl = document.querySelector("#drink-form");
var drinkInputEl = document.querySelector("#drink-search");

// information about the recipes currently displayed for easy access in localStorage functions
var displayData = [];


/* FUNCTIONS */
// read the value in the input field of mealFormEl and make an API query
var mealFormSubmitHandler = function (event) {
    // prevent default and grab the text from the input
    event.preventDefault();
    var input = mealInputEl.value.trim();
    mealInputEl.value = "";

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
    // clear displayRecipeEl and displayData
    displayRecipeEl.innerHTML = "";
    displayData = [];

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
    var id = data.meals[0].idMeal;
    
    //create display for each recipe
    var singleDisplayEl = document.createElement("li");
    singleDisplayEl.className = "collection-item avatar valign-wrapper";
    singleDisplayEl.id = "meal-container";
    singleDisplayEl.setAttribute('data-id', id);
    
    //link recipe to recipe name
    var nameEl = document.createElement("a");
    nameEl.className = "title title-change valign-wrapper";
    nameEl.textContent = mealName;

    // if mealLink exists, link to it.
    if (mealLink) {
        nameEl.setAttribute("href", mealLink);
    }

    //img of recipe
    var picEl = document.createElement("img");
    picEl.setAttribute("src", mealPic);
    picEl.style = "width:100px;height:100px";
    picEl.classList = "circle portrait responsive-img";

    // save button
    var saveButton = document.createElement("button");
    saveButton.classList = "secondary-content";
    saveButton.innerHTML = "<i class='material-icons'>grade</i>";

    singleDisplayEl.appendChild(picEl);
    singleDisplayEl.appendChild(nameEl); 
    singleDisplayEl.appendChild(saveButton);
    displayRecipeEl.appendChild(singleDisplayEl);

    // add this recipe to displayData as an object
    displayData.push({recipeType: "meal", id: id, name: mealName, imgUrl: mealPic,
                      recipe: null, ingredients: null, link: mealLink});
};


//Drinks section//
// read the value in the input field of drinkFormEl and make an API query
var drinkFormSubmitHandler = function (event) {
    
    // prevent default and grab the text from the input
    event.preventDefault();
    
    var input = drinkInputEl.value.trim();
    console.log(input)

    drinkInputEl.value = "";

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
                   displayDrinks(data);
                }
           // });
        //}
    });
};

// display up to ten of the drinks in data
// note that the drinkdb filter endpoint DOES NOT include the recipes of each drink.
// we need to do another query on each of these meals.
var displayDrinks = function (data) {
    // clear displayRecipeEl and displayData
    displayRecipeEl.innerHTML = "";
    displayData = [];

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
    var drinkRecipe = data.drinks[0].strInstructions;
    //var drinkLink = data.drinks[0].strSource; // certain drinks don't have one
    var id = data.drinks[0].idDrink;

    //create display for each recipe
    var singleDisplayEl = document.createElement("li");
    singleDisplayEl.className = "collection-item avatar valign-wrapper";
    singleDisplayEl.id = "drink-container";
    singleDisplayEl.setAttribute('data-id', id);
    
    //display recipe image 
    var picEl = document.createElement("img");
    picEl.setAttribute("src", drinkPic);
    picEl.style = "width:100px;height:100px";
    picEl.classList = "circle portrait responsiv-o";

    //display recipe name
    var nameEl = document.createElement("span");
    nameEl.className = "title";
    nameEl.textContent = drinkName;

    //display recipe instructions"
    var instructionsEl = document.createElement("p");
    instructionsEl.className = "p instructions";
    instructionsEl.textContent = drinkRecipe;

    // save button
    var saveButton = document.createElement("button");
    saveButton.classList = "secondary-content";
    saveButton.innerHTML = "<i class='material-icons'>grade</i>";

    singleDisplayEl.appendChild(nameEl);
    singleDisplayEl.appendChild(picEl);
    singleDisplayEl.appendChild(instructionsEl);
    singleDisplayEl.appendChild(saveButton);
    displayRecipeEl.appendChild(singleDisplayEl);

    // add this recipe to displayData as an object
    displayData.push({recipeType: "drink", id: id, name: drinkName, imgUrl: drinkPic,
                      recipe: drinkRecipe, ingredients: null, link: null});
};


// favoriting a recipe saves it to localStorage
var saveRecipe = function (recipeObj) {
    // get the current list of favorite recipes from localStorage
    var savedRecipes = JSON.parse(localStorage.getItem("favorites")) || [];

    // add recipeObj to savedRecipes and push back onto localStorage
    // do this ONLY if recipeObj isn't already on localStorage
    if (!includesRecipe(recipeObj, savedRecipes)) {
        savedRecipes.push(recipeObj);
        localStorage.setItem("favorites", JSON.stringify(savedRecipes));
    }
    else {
        console.log("already here");
    }
};


// helper function for saveRecipe. Return true if a duplicate recipe in the array is found.
var includesRecipe = function (recipe, arr) {
    for (var i = 0; i < arr.length; i++) {
        if ( JSON.stringify(recipe) === JSON.stringify(arr[i]) ) {
            return true;
        }
    }
    return false;
};


// when a save button is clicked, push the necessary data to localStorage
var clickSaveHandler = function (event) {
    // if closest() finds a button, we've hit the save button
    if (event.target.closest("button")) {
        // grab the li this button is part of, and its data-id
        var recipeEl = event.target.closest("li");
        var recipeElId = recipeEl.getAttribute("data-id");

        // find its corresponding element in displayData using the filter() function
        var recipeObj = displayData.filter(function (obj) {
            return obj.id === recipeElId;
        });

        saveRecipe(recipeObj);
    }
};

/* EVENT LISTENERS */
mealFormEl.addEventListener("submit", mealFormSubmitHandler);
drinkFormEl.addEventListener("submit", drinkFormSubmitHandler);
displayRecipeEl.addEventListener("click", clickSaveHandler);


/* MAIN CODE */