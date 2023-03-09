var express = require("express");
var router = express.Router();
const CreateAbl = require("../abl/recipe-abl/create-abl");
const GetAbl = require("../abl/recipe-abl/get-abl");

router.get("/getRecipes", function (req, res) {
  GetAbl(req, res);
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
