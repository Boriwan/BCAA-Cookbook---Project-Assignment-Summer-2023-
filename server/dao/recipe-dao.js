"use-strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DEFAULT_STORAGE_PATH = path.join(
  __dirname,
  "server",
  "storage",
  "recipes.json"
);

class RecipeDao {
  constructor(storagePath) {
    this.recipeStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
  }

  // create function
  create(object) {
    let recipeList = this._listAll();
    object.id = crypto.randomBytes(8).toString("hex");
    recipeList.push(object);
    fs.writeFileSync(this._getStoragePath(), JSON.stringify(recipeList));
    return object;
  }

  //edit function
  edit(object) {
    return object;
  }

  //delete function
  delete(object) {
    let recipeList = this._listAll().filter(
      (recipe) => recipe.id !== object.id
    );
    fs.writeFileSync(this._getStoragePath(), JSON.stringify(recipeList));
  }

  // edit function
  update(id, newData) {
    let recipeList = this._listAll().filter(
      (recipe) => recipe.id !== newData.id
    );
    const index = recipeList.findIndex((recipe) => recipe.id === id);
    if (index !== -1) {
      recipeList[index] = { ...recipeList[index], ...newData };
      fs.writeFileSync(this._getStoragePath(), JSON.stringify(recipeList));
    }
  }

  // post image function
  PosImg(object) {}

  // list all function
  list() {
    return this._listAll() || [];
  }

  // get specific recipe 
  get(id) {
    return this._listAll().find((recipe) => recipe.id === id);
  }

  //filters the storage and returns all recipes
  _listAll() {
    let listAll;
    try {
      const fileData = fs.readFileSync(this._getStoragePath());
      if (fileData) listAll = JSON.parse(fileData);
    } catch (e) {
      listAll = [];
    }
    return listAll;
  }

  // returns the storage path where the recipe list is stored
  _getStoragePath() {
    return this.recipeStoragePath;
  }
}

module.exports = RecipeDao;
