var express = require("express");
var router = express.Router();
const CreateAbl = require("../abl/recipe-abl/create-abl");
const GetAllAbl = require("../abl/recipe-abl/getAll-abl");
const GetAbl = require("../abl/recipe-abl/get-abl");
const DeleteAbl = require("../abl/recipe-abl/delete-abl");
const UpdateAbl = require("../abl/recipe-abl/update-abl");
const UploadImgAbl = require("../abl/recipe-abl/upload-img-abl");
const GetImgAbl = require("../abl/recipe-abl/get-img-abl");

router.get("/getRecipes", function (req, res) {
  GetAllAbl(req, res);
});
router.get("/getRecipe/:id", function (req, res) {
  GetAbl(req, res);
});
router.get("/image/:name", function (req, res) {
  GetImgAbl(req, res);
});

router.post("/createRecipe", function (req, res) {
  CreateAbl(req, res);
  UploadImgAbl(req, res);
});


router.post("/postImage", function (req, res) {
  UploadImgAbl(req, res);
});
//Update by ID Method
router.put("/updateRecipe/:id", (req, res) => {
  UpdateAbl(req, res);
});

//Delete by ID Method
router.delete("/deleteRecipe/:id", (req, res) => {
  DeleteAbl(req, res);
});

//export this router to use in our index.js
module.exports = router;
