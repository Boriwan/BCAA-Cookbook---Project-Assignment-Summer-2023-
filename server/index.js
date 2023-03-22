const RecipeController = require('./controllers/recipe')

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

app.use("/recipe",  RecipeController) 

app.listen(port);
