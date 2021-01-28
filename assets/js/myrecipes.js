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
    // make container div element //card
    var displayEl = document.createElement("div");
    displayEl.className="card col s4";

    //make container card element
    var nameImageEl=document.createElement("div");
    nameImageEl.className="card-image";

    // image 
    var picEl = document.createElement("img");
    picEl.setAttribute("src", recipeObj.imgUrl);
    
     // name
     var nameEl= document.createElement("span")
     nameEl.textContent = recipeObj.name;
     nameEl.className="card-title";
    
    //div for card-action
    var cardActionEl= document.createElement("div");
    cardActionEl.className="card-action";

    // link the name to a website, if any
    
    var recipeEl = document.createElement("a");
      // instructions, if any
    
    var ingredientsEl = document.createElement("ul");
    
    if (recipeObj.link) {
        
        recipeEl.textContent = "Recipe Link";

        recipeEl.setAttribute("href", recipeObj.link);
        recipeEl.setAttribute("target", "_blank");
        cardActionEl.appendChild(recipeEl)
    }
    else if (recipeObj.recipe) {
        ingredientsEl.textContent = recipeObj.recipe || "";
        cardActionEl.appendChild(ingredientsEl);

        }
        else {
            cardActionEl.appendChild(recipeEl)
        }
   
   nameImageEl.appendChild(picEl);
   nameImageEl.appendChild(nameEl);
   displayEl.appendChild(nameImageEl);
  
   displayEl.appendChild(cardActionEl);
   displayFavoritesEl.appendChild(displayEl);

};


/* EVENT LISTENERS */
dropdownEl.addEventListener("change", filterRecipes);


$(document).ready(function(){
    $('select').formSelect();
});
      
$(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
  });
       
/* MAIN CODE */
loadRecipes();
displayRecipes("none");
