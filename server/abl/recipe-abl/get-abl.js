const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");
const recipeList = require("../../storage/recipes.json");
let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

// console.log(recipeList);

function GetAbl(req, res) {
  const recipe = recipeList.filter((x) => x.id === req);

  if (recipe) {
    res.json(recipe);
  } else {
    res.status(400).json({ error: "Recipe does not exist" });
  }
}

module.exports = GetAbl;
