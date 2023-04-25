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
  const ingredient = dao.get(req.params.id);
  if (ingredient) {
    const isUsedInRecipe = recipeDao
      .getAll()
      .some((recipe) => recipe.ingredients.includes(req.params.id));

    if (isUsedInRecipe) {
      res.status(400).json({
        error: "Ingredient is being used in a recipe and cannot be deleted",
      });
    } else {
      ingredientDao.delete(ingredient);
      res.json(`Ingredient with id ${req.params.id} has been deleted`);
    }
  } else {
    res.status(400).json({ error: "Ingredient does not exist" });
  }
}
module.exports = DeleteAbl;
