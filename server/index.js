const RecipeController = require("./controllers/recipe");
const CategoryController = require("./controllers/category");
const IngredientController = require("./controllers/ingredient");
const ingredients = require("./storage/ingredients.json");
const categories = require("./storage/categories.json");
const ListAbl = require("./abl/recipe-abl/listAbl");
var express = require("express");
var app = express();
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const port = 8000;

app.get("/recipes", function (req, res) {
  res.json(ListAbl(req, res));
});
app.get("/ingredients", function (req, res) {
  res.json(ingredients);
});
app.get("/categories", function (req, res) {
  res.json(categories);
});

app.use("/recipe", RecipeController);

app.use("/category", CategoryController);

app.use("/ingredient", IngredientController);

app.listen(port);
