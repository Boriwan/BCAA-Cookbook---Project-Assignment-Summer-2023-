const IngredientDao = require("../../dao/ingredient-dao");
const path = require("path");

let dao = new IngredientDao(
  path.join(__dirname, "..", "..", "storage", "ingredients.json")
);

// console.log(ingredientList);

function GetAbl(req, res) {
  const ingredient = dao.get(req.params.id);
  if (ingredient) {
    res.json(ingredient);
  } else {
    res.status(400).json({ error: "Ingredient does not exist" });
  }
}

module.exports = GetAbl;
