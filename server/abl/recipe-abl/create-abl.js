const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer"); // To handle file uploads
const fs = require("fs");
const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/img/"); // Save images to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename to be the current timestamp plus the original filename
  },
});
const upload = multer({ storage: storage });

let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

function CreateAbl(req, res) {
  let body = req.body;
  const image = req.files.img;

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
  const today = new Date();
  const isoDate = today.toISOString().substr(0, 10);

  let recipe = {
    name: body.name,
    desc: body.desc,
    method: JSON.parse(body.method),
    finalAmount: body.finalAmount,
    prepLength: body.prepLength,
    ingredients: JSON.parse(body.ingredients),
    img: isoDate + image.name,
    categories: JSON.parse(body.categories),
    ratingValue: [],
    ratingCount: 0,
  };

  // calculates the average rating for the recipe
  function getAvgRating() {
    if (recipe.ratings.length > 0) {
      const sum = recipe.ratings.reduce((acc, curr) => acc + curr, 0);
      const avg = sum / recipe.ratings.length;
      return avg;
    }
  }

  const recipeList = dao._listAll();
  const duplicate = recipeList.find(
    (existingRecipe) =>
      existingRecipe.name === recipe.name &&
      existingRecipe.desc === recipe.desc &&
      existingRecipe.finalAmount === recipe.finalAmount &&
      existingRecipe.prepLength === recipe.prepLength &&
      JSON.stringify(existingRecipe.ingredients) ===
        JSON.stringify(recipe.ingredients)
  );

  if (duplicate) {
    res.status(400);
    return res.json({ error: "Recipe already exists." });
  }

  try {
    recipe = dao.create(recipe);
  } catch (e) {
    res.status(500);
    return res.json({ error: e.message });
  }

  res.send(recipe);
}

module.exports = CreateAbl;
