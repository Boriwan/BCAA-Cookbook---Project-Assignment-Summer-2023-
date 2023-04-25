// implement abl
const IngredientDao = require("../../dao/ingredient-dao");
const path = require("path");

let dao = new IngredientDao(
  path.join(__dirname, "..", "..", "storage", "ingredients.json")
);

function CreateAbl(req, res) {
  let body = req.body;
  if (!body.name || !body.finalAmount) {
    return res
      .status(400)
      .json({ error: "Invalid input: code parameter is missing." });
  }

  let ingredient = {
    name: body.name,
    measurement: body.measurement,
  };

  const ingredientList = dao._listAll();
  const duplicate = ingredientList.find(
    (existingIngredient) => existingIngredient.name === ingredient.name
  );

  if (duplicate) {
    res.status(400);
    return res.json({ error: "Ingredient already exists." });
  }

  try {
    ingredient = dao.create(ingredient);
  } catch (e) {
    res.status(500);
    return res.json({ error: e.message });
  }

  res.send(ingredient);
}

module.exports = CreateAbl;
