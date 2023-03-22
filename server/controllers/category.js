var express = require("express");
var router = express.Router();
const CreateAbl = require("../abl/category-abl/create-abl");
const GetAllAbl = require("../abl/category-abl/getAll-abl");
const GetAbl = require("../abl/category-abl/get-abl");
const DeleteAbl = require("../abl/category-abl/delete-abl");
const UpdateAbl = require("../abl/category-abl/update-abl");

router.get("/getCategories", function (req, res) {
  GetAllAbl(req, res);
});
router.get("/getCategory/:id", function (req, res) {
  GetAbl(req, res);
});

router.post("/createCategory", function (req, res) {
  CreateAbl(req, res);
});

//Update by ID Method
router.put("/updateCategory/:id", (req, res) => {
  UpdateAbl(req, res);
});

//Delete by ID Method
router.delete("/deleteCategory/:id", (req, res) => {
  DeleteAbl(req, res);
});

//export this router to use in our index.js
module.exports = router;
