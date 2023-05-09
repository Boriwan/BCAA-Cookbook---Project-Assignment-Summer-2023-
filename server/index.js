const RecipeController = require("./controllers/recipe");
const CategoryController = require("./controllers/category");
const IngredientController = require("./controllers/ingredient");
const GetAllRecipesAbl = require("./abl/recipe-abl/list-all-abl");
const GetAllCategoriesAbl = require("./abl/category-abl/list-all-abl");
const GetAllIngredientsAbl = require("./abl/ingredient-abl/list-all-abl");
var express = require("express");
var app = express();
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

//default port
const port = 8000;

// controllers
app.use("/recipe", RecipeController);
app.use("/category", CategoryController);
app.use("/ingredient", IngredientController);

app.listen(port);
