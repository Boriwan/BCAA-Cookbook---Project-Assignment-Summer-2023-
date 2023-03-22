//implement dao
"use-strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DEFAULT_STORAGE_PATH = path.join(
  __dirname,
  "server",
  "storage",
  "ingredients.json"
);

class IngredientDao {
  constructor(storagePath) {
    this.ingredientStoragePath = storagePath
      ? storagePath
      : DEFAULT_STORAGE_PATH;
  }

  create(object) {
    let ingredientList = this._listAll();
    object.id = crypto.randomBytes(8).toString("hex");
    ingredientList.push(object);
    fs.writeFileSync(this._getStoragePath(), JSON.stringify(ingredientList));
    return object;
  }

  edit(object) {
    return object;
  }

  delete(object) {
    let ingredientList = this._listAll().filter(
      (ingredient) => ingredient.id !== object.id
    );
    fs.writeFileSync(this._getStoragePath(), JSON.stringify(ingredientList));
  }

  update(id, newData) {
    let ingredientList = this._listAll().filter(
      (ingredient) => ingredient.id !== newData.id
    );
    const index = ingredientList.findIndex(
      (ingredient) => ingredient.id === id
    );
    if (index !== -1) {
      ingredientList[index] = { ...ingredientList[index], ...newData };
      fs.writeFileSync(this._getStoragePath(), JSON.stringify(ingredientList));
    }
  }

  list() {
    return this._listAll();
  }
  get(id) {
    return this._listAll().find((ingredient) => ingredient.id === id);
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
    return this.ingredientStoragePath;
  }
}

module.exports = IngredientDao;
