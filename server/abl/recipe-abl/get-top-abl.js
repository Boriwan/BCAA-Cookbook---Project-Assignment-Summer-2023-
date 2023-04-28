const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");

let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

function GetTopRecipes(req, res) {
  const recipes = dao.list();
  const topRecipes = recipes
    .sort((a, b) => {
      const aRating =
        a.ratingValue.reduce((acc, val) => acc + val, 0) / a.ratingCount;
      const bRating =
        b.ratingValue.reduce((acc, val) => acc + val, 0) / b.ratingCount;
      return bRating - aRating;
    })
    .slice(0, 10);
  res.json(topRecipes);
}

module.exports = GetTopRecipes;
