// implement abl
const RecipeDao = require("./dao/recipe-dao");
const path = require("path");

let dao = new RecipeDao(path.join(__dirname, "storage", "recipes.json"));

function CreateAbl(req, res) {
  let recipe = req.body;
  recipe = dao.create(recipe);
  res.send(recipe);
}

module.exports = CreateAbl;
