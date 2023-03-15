const RecipeDao = require("../../dao/recipe-dao");
const path = require("path");

function editAbl() {
    const recipeDao = new RecipeDao();
    recipeDao.editAbl();
}

