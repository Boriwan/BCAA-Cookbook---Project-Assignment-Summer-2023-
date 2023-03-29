const RecipeController = require("./controllers/recipe");
const CategoryController = require("./controllers/category");
const IngredientController = require("./controllers/ingredient");

var express = require("express");
var app = express();
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const port = 8000;

app.get("/", function (req, res) {
  res.send("Cookbook");
});

app.use("/recipe", RecipeController);

app.use("/category", CategoryController);

app.use("/ingredient", IngredientController);


app.listen(port);
