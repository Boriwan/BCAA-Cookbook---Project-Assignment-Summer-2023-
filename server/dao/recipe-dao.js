//implement dao
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

  create(object) {
    let recipeList = this._listAll();
    object.id = crypto.randomBytes(8).toString("hex");
    recipeList.push(object);
    fs.writeFileSync(this._getStoragePath(), JSON.stringify(recipeList));
    return object;
  }

  edit(object) {
    return object;
  }

  delete(object) {
    let recipeList = this._listAll().filter(
      (recipe) => recipe.id !== object.id
    );
    fs.writeFileSync(this._getStoragePath(), JSON.stringify(recipeList));
  }
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
  PosImg(object) {}

  list() {
    return this._listAll();
  }
  get(id) {
    return this._listAll().find((recipe) => recipe.id === id);
  }

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

  _getStoragePath() {
    return this.recipeStoragePath;
  }
}

module.exports = RecipeDao;
