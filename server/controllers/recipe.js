var express = require("express");
var router = express.Router();

router.get("/getRecipe", function (req, res) {
  res.send("GET route on rofl.");
});

router.put("/putRecipe", (req, res) => {
  res.send("Got a PUT request at /putRecipe");
});

router.post("/postRecipe", function (req, res) {
  res.send("Post recipe");
});

//export this router to use in our index.js
module.exports = router;
