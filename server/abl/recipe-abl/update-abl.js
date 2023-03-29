const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");
let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

function UpdateAbl(req, res) {
  const recipe = dao.get(req.params.id);
  const id = req.params.id;
  const newData = req.body;
  if (recipe) {
    dao.update(id, newData);
    res.json("Recipe has been updated");
  } else {
    res.status(400).json({ error: "Recipe does not exist" });
  }
    res.json(updatedObject);

}
module.exports = UpdateAbl;
