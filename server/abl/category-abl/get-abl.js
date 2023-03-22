const CategoryDao = require("../../dao/category-dao");
const path = require("path");

let dao = new CategoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

// console.log(categoryList);

function GetAbl(req, res) {
  const category = dao.get(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(400).json({ error: "Category does not exist" });
  }
}

module.exports = GetAbl;
