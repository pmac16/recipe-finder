/* GLOBAL VARIABLES */
/* each element in favoriteRecipes is an object that looks like this:
{
    recipeType: "meal" or "drink",
    id: ##### (the id number of this recipe in the API),
    name: "name of recipe",
    imgUrl: "url of the strMealThumb/strDrinkThumb",
    recipe: "the strInstructions",
    ingredients: ["an", "array", "of", "a", "bunch", "of", "ingredients"], 
    link: "link to the original recipe" (for drinks, this will be null!)
}
*/
var favoriteRecipes = [];
var dropdownEl = document.querySelector("#recipe-filter");
var displayFavoritesEl = document.querySelector("#display-favorites");



/* FUNCTIONS */
// loads recipes from localStorage into the favoriteRecipes array.
var loadRecipes = function () {
    favoriteRecipes = JSON.parse(localStorage.getItem("favorites")) || [];
};

// if we ever need to save the favoriteRecipes back to localStorage, use this.
var saveRecipes = function () {
    localStorage.setItem("favorites", JSON.stringify(favoriteRecipes));
};

// call displayRecipes again with the filter option selected
var filterRecipes = function (event) {
    var filterOpt = dropdownEl.value;
    displayRecipes(filterOpt);
};

// display Recipes based on filter criteria
var displayRecipes = function (filterOption) {
    // clear old display
    displayFavoritesEl.innerHTML = "";

    // if filterOption isn't "none", filter favoriteRecipes by the filter option.
    var displayThese = []; 
    if (filterOption != "none") {
        displayThese = favoriteRecipes.filter(function (obj) {
            return obj.recipeType === filterOption;
        });
    }
    else {
        displayThese = favoriteRecipes;
    }

    for (var i = 0; i < displayThese.length; i++) {
        recipeDisplay(displayThese[i]);
    }
};

// display a recipe to the page.
var recipeDisplay = function (recipeObj) {
    // make container div element
    var displayEl = document.createElement("div");

    // name
    var nameEl = document.createElement("a");
    nameEl.textContent = recipeObj.name;

    // link the name to a website, if any
    if (recipeObj.link) {
        nameEl.setAttribute("href", recipeObj.link);
        nameEl.setAttribute("target", "_blank");
    }
    
    // image 
    var picEl = document.createElement("img");
    picEl.setAttribute("src", recipeObj.imgUrl);

    // instructions, if any
    var instructionsEl = document.createElement("p");
    instructionsEl.textContent = recipeObj.recipe || "";

    // ingredients list, if any
    var ingredientsEl = document.createElement("ul");
    if (recipeObj.ingredients) {
        for (var i = 0; i < recipeObj.ingredients.length; i++) {
            var oneIngredientEl = document.createElement("li");

            oneIngredientEl.textContent = recipeObj.ingredients[i];
            
            ingredientsEl.appendChild(oneIngredientEl);
        }
    }

    // append all to displayEl and display it
    displayEl.appendChild(nameEl);
    displayEl.appendChild(picEl);
    displayEl.appendChild(instructionsEl);
    displayEl.appendChild(ingredientsEl);

    displayFavoritesEl.appendChild(displayEl);
};


/* EVENT LISTENERS */
dropdownEl.addEventListener("change", filterRecipes);


/* MAIN CODE */
loadRecipes();
displayRecipes("none");