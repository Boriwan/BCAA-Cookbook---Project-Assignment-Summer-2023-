const RecipeController = require("./controllers/recipe");
const CategoryController = require("./controllers/category");
const IngredientController = require("./controllers/ingredient");

var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.get("/", function (req, res) {
  res.send("Cookbook");
});

app.use("/recipe", RecipeController);

app.use("/category", CategoryController);

app.use("/ingredient", IngredientController);

app.listen(port);
