var express = require("express");
var router = express.Router();
const CreateAbl = require("../abl/ingredient-abl/create-abl");
const GetAbl = require("../abl/ingredient-abl/get-abl");
const DeleteAbl = require("../abl/ingredient-abl/delete-abl");
const UpdateAbl = require("../abl/ingredient-abl/update-abl");

// get ingredient by its ID
router.get("/getIngredient/:id", function (req, res) {
  GetAbl(req, res);
});

//create a new ingredient
router.post("/createIngredient", function (req, res) {
  CreateAbl(req, res);
});

//update a certain ingredient by its ID
router.put("/updateIngredient/:id", (req, res) => {
  UpdateAbl(req, res);
});

//delete a certain ingredient by its ID
router.delete("/deleteIngredient/:id", (req, res) => {
  DeleteAbl(req, res);
});

//export this router to use in index.js
module.exports = router;
