var express = require("express");
var router = express.Router();
const CreateAbl = require("../abl/ingredient-abl/create-abl");
const GetAllAbl = require("../abl/ingredient-abl/getAll-abl");
const GetAbl = require("../abl/ingredient-abl/get-abl");
const DeleteAbl = require("../abl/ingredient-abl/delete-abl");
const UpdateAbl = require("../abl/ingredient-abl/update-abl");

router.get("/getIngredients", function (req, res) {
  GetAllAbl(req, res);
});
router.get("/getIngredient/:id", function (req, res) {
  GetAbl(req, res);
});

router.post("/createIngredient", function (req, res) {
  CreateAbl(req, res);
});

//Update by ID Method
router.put("/updateIngredient/:id", (req, res) => {
  UpdateAbl(req, res);
});

//Delete by ID Method
router.delete("/deleteIngredient/:id", (req, res) => {
  DeleteAbl(req, res);
});

//export this router to use in our index.js
module.exports = router;
