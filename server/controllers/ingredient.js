var express = require("express");
var router = express.Router();
const CreateAbl = require("../abl/ingredient-abl/create-abl");
const GetAbl = require("../abl/ingredient-abl/get-abl");
const DeleteAbl = require("../abl/ingredient-abl/delete-abl");
const UpdateAbl = require("../abl/ingredient-abl/update-abl");

// get ingredient by its ID
router.get("/get/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  GetAbl(req, res);
});

//create a new ingredient
router.post("/create", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  CreateAbl(req, res);
});

//update a certain ingredient by its ID
router.put("/update/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  UpdateAbl(req, res);
});

//delete a certain ingredient by its ID
router.delete("/delete/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  DeleteAbl(req, res);
});

//export this router to use in index.js
module.exports = router;
