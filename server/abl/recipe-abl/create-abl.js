// implement abl
const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");

let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

function CreateAbl(req, res) {
  let body = req.body;
  if (
    !body.name ||
    !body.desc ||
    !body.finalAmount ||
    !body.prepLength ||
    !body.ingredients
  ) {
    return res
      .status(400)
      .json({ error: "Invalid input: code parameter is missing." });
  }

  let recipe = {
    name: body.name,
    desc: body.desc,
    finalAmount: body.finalAmount,
    prepLength: body.prepLength,
    categories: body.categories,
    ingredients: body.ingredients,
  };

  try {
    recipe = dao.create(recipe);
  } catch (e) {
    // if (e.id === "DUPLICATE_CODE") {
    //   res.status(400);
    // } else {
    //   res.status(500);
    // }
    res.status(500);
    return res.json({ error: e.message });
  }

  res.send(recipe);
}

module.exports = CreateAbl;
