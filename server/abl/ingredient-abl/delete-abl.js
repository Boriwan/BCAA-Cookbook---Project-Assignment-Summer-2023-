const IngredientDao = require("../../dao/ingredient-dao");
const path = require("path");
let dao = new IngredientDao(
  path.join(__dirname, "..", "..", "storage", "ingredients.json")
);

function DeleteAbl(req, res) {
  const ingredient = dao.get(req.params.id);

  if (ingredient) {
    dao.delete(ingredient);
  } else {
    res.status(400).json({ error: "Ingredient does not exist" });
  }

  res.json(`Ingredient with id ${req.params.id} has been deleted`);
}
module.exports = DeleteAbl;
