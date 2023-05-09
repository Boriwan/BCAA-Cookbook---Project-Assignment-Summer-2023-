var express = require("express");
var router = express.Router();
const CreateAbl = require("../abl/ingredient-abl/create-abl");
const GetAbl = require("../abl/ingredient-abl/get-abl");
const ListAll = require("../abl/ingredient-abl/list-all-abl");
const DeleteAbl = require("../abl/ingredient-abl/delete-abl");
const UpdateAbl = require("../abl/ingredient-abl/update-abl");

// get ingredient by its ID
router.get("/get/:id", function (req, res) {
  GetAbl(req, res);
});

// returns a list of all recipes
router.get("/list", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  ListAll(req, res);
});

//create a new ingredient
router.post("/create", function (req, res) {
  CreateAbl(req, res);
});

//update a certain ingredient by its ID
router.put("/update/:id", (req, res) => {
  UpdateAbl(req, res);
});

//delete a certain ingredient by its ID
router.delete("/delete/:id", (req, res) => {
  DeleteAbl(req, res);
});

//export this router to use in index.js
module.exports = router;
