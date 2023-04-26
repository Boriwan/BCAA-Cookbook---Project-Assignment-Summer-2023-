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
  const ingredient = dao.get(req.params.id);
  console.log(ingredient);
}

module.exports = UpdateAbl;
