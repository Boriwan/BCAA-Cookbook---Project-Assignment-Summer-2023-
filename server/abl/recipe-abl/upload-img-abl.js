const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");
let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

function UploadImgAbl(req, res) {
  const recipe = dao.get(req.params.id);
  const id = req.params.id;
  console.log(recipe);
  const newData = { img: req.files.image.name };
  console.log(newData);

  // const names = newData.map((data) => {
  //   return data.name;
  // });
  dao.update(id, newData);
  console.log(newData);
  const { image } = req.files;
  if (!image) return res.sendStatus(400);
  // // Move the uploaded image to our upload folder
  image.mv("storage/img/" + image.name);
  res.sendStatus(200);
}
module.exports = UploadImgAbl;
