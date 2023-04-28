const IngredientDao = require("../../dao/ingredient-dao");
const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");

let ingredientDao = new IngredientDao(
  path.join(__dirname, "..", "..", "storage", "ingredients.json")
);

let recipeDao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "ingredients.json")
);

function DeleteAbl(req, res) {
  const ingredientId = req.params.id;
  const ingredient = ingredientDao.get(ingredientId);
  console.log(ingredientId);
  // if (!category) {
  //   res.status(400).json({ error: "Category does not exist" });
  //   return;
  // }
  // // Check if there are any recipes in the category being deleted
  // const ingredientsInCategory = ingredientDao
  //   .list()
  //   .filter((recipe) => recipe.category === ingredientId);
  // if (ingredientsInCategory.length > 0) {
  //   // Move the recipes to the "uncategorized" category
  //   const uncategorizedIngredient = ingredientDao
  //     .list()
  //     .find((cat) => cat.name.toLowerCase() === "uncategorized");
  //   if (!uncategorizedIngredient) {
  //     // Create an "uncategorized" category if it doesn't exist
  //     const newCategoryId = ingredientDao.add({ name: "Uncategorized" });
  //     uncategorizedIngredient = ingredientDao.get(newCategoryId);
  //   }
  //   recipesInCategory.forEach((recipe) => {
  //     recipe.category = uncategorizedCategory.id;
  //     recipeDao.update(recipe);
  //   });
  // }
  ingredientDao.delete(ingredient);
  res.json(
    `Ingredient with id ${ingredientId} has been deleted and moved to the "uncategorized" category`
  );
}
module.exports = DeleteAbl;
