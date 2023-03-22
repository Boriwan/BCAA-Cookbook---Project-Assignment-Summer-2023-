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

//   delete(object) {
    
//   }

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
