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
    mesurement: body.mesurement,
  };

  try {
    ingredient = dao.create(ingredient);
  } catch (e) {
    // if (e.id === "DUPLICATE_CODE") {
    //   res.status(400);
    // } else {
    //   res.status(500);
    // }
    res.status(500);
    return res.json({ error: e.message });
  }

  res.send(ingredient);
}

module.exports = CreateAbl;
