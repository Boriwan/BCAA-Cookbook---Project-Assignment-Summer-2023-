// implement abl
const IngredientDao = require("../../dao/ingredient-dao");
const path = require("path");

let dao = new IngredientDao(
  path.join(__dirname, "..", "..", "storage", "ingredients.json")
);

function ListAllAbl(req, res) {
  const ingredient = dao.list();

  res.json(ingredient);
}

module.exports = ListAllAbl;
