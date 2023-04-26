const express = require("express");
const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");

let dao = new RecipeDao(
  path.join(__dirname, "..", "..", "storage", "recipes.json")
);

function RatingAbl(req, res) {
  const id = req.params.id;
  let recipe = dao.get(req.params.id);
  const rating = req.body.value;
  const list = recipe.ratingValue;
  let number = recipe.ratingCount;

  number++;

  //console.log(number);
  list.push(rating);
  dao.get(id);

  recipe.ratingValue = list;
  recipe.ratingCount = number;
  //console.log(id);
  const newData = recipe;
  //console.log(newData);
  dao.update(id, newData);
  res.json(recipe);
}

module.exports = RatingAbl;
