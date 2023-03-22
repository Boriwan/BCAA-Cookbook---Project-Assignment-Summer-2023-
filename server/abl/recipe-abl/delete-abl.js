const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");
let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

function DeleteAbl(req, res) {
  const recipe = dao.get(req.params.id);

  const updatedObject = { ...recipe, ...req.params };
  if (recipe) {
    dao.delete(recipe);
  } else {
    res.status(400).json({ error: "Recipe does not exist" });
  }

  res.json(`Recipe with id ${req.params.id} has been deleted`);
}
module.exports = DeleteAbl;
