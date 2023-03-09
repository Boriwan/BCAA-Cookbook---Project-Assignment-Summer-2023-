// implement abl
const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");

let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

function GetAbl(req, res) {
  const recipe = dao.list();


  res.json(recipe);
}

module.exports = GetAbl;
