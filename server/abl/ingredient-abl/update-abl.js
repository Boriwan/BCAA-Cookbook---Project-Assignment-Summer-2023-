const IngredientDao = require("../../dao/ingredient-dao");
const path = require("path");
let dao = new IngredientDao(
  path.join(__dirname, "..", "..", "storage", "ingredients.json")
);

function UpdateAbl(req, res) {
  const ingredient = dao.get(req.params.id);
  const id = req.params.id;
  const newData = req.body;
  if (ingredient) {
    dao.update(id, newData);
    res.json("Ingredient has been updated");
  } else {
    res.status(400).json({ error: "Ingredient does not exist" });
  }

  res.json(updatedObject);
}
module.exports = UpdateAbl;
