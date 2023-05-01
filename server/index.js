const RecipeController = require("./controllers/recipe");
const CategoryController = require("./controllers/category");
const IngredientController = require("./controllers/ingredient");
const GetAllRecipesAbl = require("./abl/recipe-abl/getAll-abl");
const GetAllCategoriesAbl = require("./abl/category-abl/getAll-abl");
const GetAllIngredientsAbl = require("./abl/ingredient-abl/getAll-abl");
var express = require("express");
var app = express();
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

//default port
const port = 8000;

// returns a list of all recipes
app.get("/recipes", function (req, res) {
  if (!res.headersSent) {
    const recipes = GetAllRecipesAbl(req, res);
    res.json(recipes);
  }
});

// returns a list of all categories
app.get("/categories", function (req, res) {
  const categories = GetAllCategoriesAbl(req, res);
  res.json(categories);
});

// returns a list of all ingredients
app.get("/ingredients", function (req, res) {
  const ingredients = GetAllIngredientsAbl(req, res);
  res.json(ingredients);
});

// controllers
app.use("/recipe", RecipeController);
app.use("/category", CategoryController);
app.use("/ingredient", IngredientController);

app.listen(port);
