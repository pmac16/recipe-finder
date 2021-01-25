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
favoriteRecipes = [];
recipeListEl = document.querySelector("#recipe-list");

/* FUNCTIONS */
// loads recipes from localStorage into the favoriteRecipes array.
var loadRecipes = function () {
    favoriteRecipes = JSON.parse(localStorage.getItem("favorites")) || [];
};

// if we ever need to save the favoriteRecipes back to localStorage, use this.
var saveRecipes = function () {
    localStorage.setItem("favorites", JSON.stringify(favoriteRecipes));
};


/* EVENT LISTENERS */


/* MAIN CODE */
loadRecipes();