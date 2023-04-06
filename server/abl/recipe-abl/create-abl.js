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
  // const { image } = req.files;
  // if (!image) return res.sendStatus(400);
  // // // Move the uploaded image to our upload folder
  // image.mv("storage/img/" + image.name);

  res.send(recipe);
}

module.exports = CreateAbl;
