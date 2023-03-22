const CategoryDao = require("../../dao/category-dao");
const path = require("path");
let dao = new CategoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

function DeleteAbl(req, res) {
  const category = dao.get(req.params.id);

  if (category) {
    dao.delete(category);
  } else {
    res.status(400).json({ error: "category does not exist" });
  }

  res.json(`Category with id ${req.params.id} has been deleted`);
}
module.exports = DeleteAbl;
