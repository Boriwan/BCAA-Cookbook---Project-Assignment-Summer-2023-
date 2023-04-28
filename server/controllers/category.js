var express = require("express");
var router = express.Router();
const CreateAbl = require("../abl/category-abl/create-abl");
const GetAbl = require("../abl/category-abl/get-abl");
const DeleteAbl = require("../abl/category-abl/delete-abl");
const UpdateAbl = require("../abl/category-abl/update-abl");
const GetTopAbl = require("../abl/recipe-abl/get-top-abl");
// get category by its ID
router.get("/get/:id", function (req, res) {
  GetAbl(req, res);
});

//create a new category
router.post("/create", function (req, res) {
  CreateAbl(req, res);
});

//update a certain category by its ID
router.put("/update/:id", (req, res) => {
  UpdateAbl(req, res);
});

//delete a certain category by its ID
router.delete("/delete/:id", (req, res) => {
  DeleteAbl(req, res);
});

//export this router to use in index.js
module.exports = router;
