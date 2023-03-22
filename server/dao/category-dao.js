//implement dao
"use-strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DEFAULT_STORAGE_PATH = path.join(
  __dirname,
  "server",
  "storage",
  "categories.json"
);

class CategoryDao {
  constructor(storagePath) {
    this.categoryStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
  }

  create(object) {
    let categoryList = this._listAll();
    object.id = crypto.randomBytes(8).toString("hex");
    categoryList.push(object);
    fs.writeFileSync(this._getStoragePath(), JSON.stringify(categoryList));
    return object;
  }

  edit(object) {
    return object;
  }

  delete(object) {
    let categoryList = this._listAll().filter(
      (category) => category.id !== object.id
    );
    fs.writeFileSync(this._getStoragePath(), JSON.stringify(categoryList));
  }

  update(id, newData) {
    let categoryList = this._listAll().filter(
      (category) => category.id !== newData.id
    );
    const index = categoryList.findIndex((category) => category.id === id);
    if (index !== -1) {
      categoryList[index] = { ...categoryList[index], ...newData };
      fs.writeFileSync(this._getStoragePath(), JSON.stringify(categoryList));
    }
  }

  list() {
    return this._listAll();
  }
  get(id) {
    return this._listAll().find((category) => category.id === id);
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
    return this.categoryStoragePath;
  }
}

module.exports = CategoryDao;
