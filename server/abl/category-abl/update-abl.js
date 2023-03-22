// TODO

const CategoryDao = require("../../dao/category-dao");
const path = require("path");
let dao = new CategoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

function UpdateAbl(req, res) {
  const category = dao.get(req.params.id);
  const id = req.params.id;
  const newData = req.body;
  if (category) {
    dao.update(id, newData);
    res.json("Category has been updated");
  } else {
    res.status(400).json({ error: "Category does not exist" });
  }

  res.json(updatedObject);
}
module.exports = UpdateAbl;
