const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer"); // To handle file uploads
const fs = require("fs");
const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");

let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

function UpdateAbl(req, res) {
  const id = req.params.id;
  // const image = req.files.img; // debug output
  // let img = "";
  const today = new Date();
  const isoDate = today.toISOString().substr(0, 10);
  let body = req.body;

  let recipe = {
    name: body.name,
    desc: body.desc,
    method: JSON.parse(body.method),
    finalAmount: body.finalAmount,
    prepLength: body.prepLength,
    ingredients: JSON.parse(body.ingredients),
    categories: JSON.parse(body.categories),
    // img: body.img,
  };
  if (req.files) {
    const image = req.files.img;
    const id = req.params.id;

    const today = new Date();
    const isoDate = today.toISOString().substr(0, 10);
    image.mv("storage/img/" + isoDate + image.name);
    img = recipe.img = isoDate + image.name;
  }
  if (body.img) {
    img = body.img;
    recipe.img = body.img;
    console.log(body.img);
  }

  // if (req.file) {
  //   // check if req.file exists
  //   recipe.img = req.file.filename;
  // }
  console.log(recipe);
  if (recipe) {
    dao.update(id, recipe);
    res.json(recipe);
  } else {
    res.status(400).json({ error: "Recipe does not exist" });
  }
  res.json(recipe);
}

module.exports = UpdateAbl;
