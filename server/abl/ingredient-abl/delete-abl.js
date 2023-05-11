const IngredientDao = require("../../dao/ingredient-dao");
const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");

let ingredientDao = new IngredientDao(
  path.join(__dirname, "..", "..", "storage", "ingredients.json")
);

let recipeDao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

function DeleteAbl(req, res) {
  const ingredientId = req.params.id;
  const ingredient = ingredientDao.get(ingredientId);

  const ingredientName = ingredientDao
    .list()
    .find((ingredient) => ingredient.id === ingredientId)?.name;

  const hasRecipesInIngredient = recipeDao.list().some((recipe) => {
    return recipe.ingredients.some((ingredient) => {
      return ingredient.name === ingredientName;
    });
  });

  if (hasRecipesInIngredient) {
    throw new Error("Cannot delete ingredint with associated recipes.");
  } else {
    ingredientDao.delete(ingredient);
    res.json(`Ingredient with id ${ingredientId} has been deleted.`);
  }
}
module.exports = DeleteAbl;
