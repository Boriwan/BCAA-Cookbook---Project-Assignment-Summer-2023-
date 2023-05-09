var express = require("express");
var router = express.Router();
const CreateAbl = require("../abl/recipe-abl/create-abl");
const GetAbl = require("../abl/recipe-abl/get-abl");
const ListAll = require("../abl/recipe-abl/list-all-abl");
const DeleteAbl = require("../abl/recipe-abl/delete-abl");
const UpdateAbl = require("../abl/recipe-abl/update-abl");
const UploadImgAbl = require("../abl/recipe-abl/upload-img-abl");
const GetImgAbl = require("../abl/recipe-abl/get-img-abl");
const RatingAbl = require("../abl/recipe-abl/rating-abl.js");
const GetTopAbl = require("../abl/recipe-abl/get-top-abl.js");
const FilterRecipesAbl = require("../abl/recipe-abl/filter-recipes-abl.js");

// get recipe by its ID
router.get("/get/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  GetAbl(req, res);
});

// returns a list of all recipes
router.get("/list", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  ListAll(req, res);
});

// get recipe Image
router.get("/image/:name", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  GetImgAbl(req, res);
});

//get list of recipes
router.get("/getTopRecipes", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  GetTopAbl(req, res);
});
router.get("/filterRecipes/:category", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  FilterRecipesAbl(req, res);
});

//create a new recipe
router.post("/create", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  CreateAbl(req, res);
  UploadImgAbl(req, res);
});

// post an image to the recipe
router.post("/postImage", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  UploadImgAbl(req, res);
});

//update a certain recipe by its ID
router.put("/update/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  UpdateAbl(req, res);
});
router.put("/addRating/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  RatingAbl(req, res);
});

//delete a certain recipe by its ID
router.delete("/delete/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  DeleteAbl(req, res);
});

//export this router to use in index.js
module.exports = router;
