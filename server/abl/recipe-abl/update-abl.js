const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");
let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

function UpdateAbl(req, res) {
  let body = req.body;
  // const image = req.files.img;
  const id = req.params.id;
  const today = new Date();
  const isoDate = today.toISOString().substr(0, 10);
  let recipe = {
    name: body.name,
    desc: body.desc,
    method: JSON.parse(body.method),
    finalAmount: body.finalAmount,
    prepLength: body.prepLength,
    ingredients: JSON.parse(body.ingredients),
    img: body.img,
    categories: JSON.parse(body.categories),
  };
  if (recipe) {
    dao.update(id, recipe);
    res.json("Recipe has been updated");
  } else {
    res.status(400).json({ error: "Recipe does not exist" });
  }
  res.json(recipe);
}
module.exports = UpdateAbl;
