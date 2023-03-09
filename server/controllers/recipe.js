var express = require("express");
var router = express.Router();
const CreateAbl = require("../abl/recipe-abl/create-abl");
const GetAllAbl = require("../abl/recipe-abl/getAll-abl");

router.get("/getRecipes", function (req, res) {
  GetAllAbl(req, res);
});

router.post("/postRecipe", function (req, res) {
  CreateAbl(req, res);
});

router.put("/putRecipe", (req, res) => {
  res.send("Got a PUT request at /putRecipe");
});

// router.delete("/deleteRecipe", (req, res) => {

// }

//export this router to use in our index.js
module.exports = router;
