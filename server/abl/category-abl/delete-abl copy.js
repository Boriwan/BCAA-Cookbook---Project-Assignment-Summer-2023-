const CategoryDao = require("../../dao/category-dao");
const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");

let categoryDao = new CategoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

let recipeDao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

function DeleteAbl(req, res) {
  const categoryId = req.params.id;
  const category = categoryDao.get(categoryId);

  if (!category) {
    res.status(400).json({ error: "Category does not exist" });
    return;
  }

  // Check if there are any recipes in the category being deleted
  const recipesInCategory = recipeDao
    .list()
    .filter((recipe) => recipe.category === categoryId);

  if (recipesInCategory.length > 0) {
    // Move the recipes to the "uncategorized" category
    const uncategorizedCategory = categoryDao
      .list()
      .find((cat) => cat.name.toLowerCase() === "uncategorized");
    if (!uncategorizedCategory) {
      // Create an "uncategorized" category if it doesn't exist
      const newCategoryId = categoryDao.add({ name: "Uncategorized" });
      uncategorizedCategory = categoryDao.get(newCategoryId);
    }

    recipesInCategory.forEach((recipe) => {
      recipe.category = uncategorizedCategory.id;
      recipeDao.update(recipe);
    });
  }

  // Delete the category
  categoryDao.delete(category);
  res.json(
    `Category with id ${categoryId} has been deleted and moved to the "uncategorized" category`
  );
}

module.exports = DeleteAbl;
