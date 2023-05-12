const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");
const GetTopAbl = require("./get-top-abl");

let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

function FilterRecipesAbl(req, res) {
  const category = req.params.category;
  const recipes = dao.list();
  const filteredRecipes = recipes.filter(
    (recipe) => recipe.categories && recipe.categories.includes(category)
  );
  const topRecipes = filteredRecipes
    .sort((a, b) => {
      const aRating =
        a.ratingValue.reduce((acc, val) => acc + val, 0) / a.ratingCount;
      const bRating =
        b.ratingValue.reduce((acc, val) => acc + val, 0) / b.ratingCount;
      return bRating - aRating;
    })
    .slice(0, 5);

  res.json(topRecipes);
}

module.exports = FilterRecipesAbl;
