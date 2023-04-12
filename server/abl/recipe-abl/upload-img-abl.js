const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");
let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

function UploadImgAbl(req, res) {
  const image = req.files.img;
  // console.log(image);
  if (!image) return res.sendStatus(400);
  const today = new Date();
  const isoDate = today.toISOString().substr(0, 10);
  // // Move the uploaded image to our upload folder
  image.mv("storage/img/" + isoDate + image.name);
}
module.exports = UploadImgAbl;
