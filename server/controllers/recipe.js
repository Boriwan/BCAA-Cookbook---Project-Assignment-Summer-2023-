var express = require("express");
var router = express.Router();
const CreateAbl = require("../create-abl");


router.get("/getRecipe", function (req, res) {
  res.send("GET Recipe");
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
