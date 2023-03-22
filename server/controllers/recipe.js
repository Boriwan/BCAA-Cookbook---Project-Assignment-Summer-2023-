var express = require("express");
var router = express.Router();
const CreateAbl = require("../abl/recipe-abl/create-abl");
const GetAllAbl = require("../abl/recipe-abl/getAll-abl");
const GetAbl = require("../abl/recipe-abl/get-abl");

router.get("/getRecipes", function (req, res) {
  GetAllAbl(req, res);
});
router.get("/getRecipe/:id", function (req, res) {
  GetAbl(req, res);
});

router.post("/createRecipe", function (req, res) {
  CreateAbl(req, res);
});

router.put("/putRecipe", (req, res) => {
  res.send("Got a PUT request at /putRecipe");
});

// router.delete("/deleteRecipe", (req, res) => {

// }

//export this router to use in our index.js
module.exports = router;
