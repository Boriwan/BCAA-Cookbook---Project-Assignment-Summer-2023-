// implement abl
const categoryDao = require("../../dao/category-dao");
const path = require("path");

let dao = new categoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

function CreateAbl(req, res) {
  let body = req.body;
  if (
    !body.name ||
    !body.desc 
  ) {
    return res
      .status(400)
      .json({ error: "Invalid input: code parameter is missing." });
  }

  let category = {
    name: body.name,
    desc: body.desc
  };


const categoryList = dao._listAll();
const duplicate = categoryList.find(
  (existingCategory) =>
    existingCategory.name === category.name &&
    existingCategory.desc === category.desc
);

if (duplicate) {
  res.status(400);
  return res.json({ error: "Category already exists." });
}

try {
  category = dao.create(category);
} catch (e) {
  res.status(500);
  return res.json({ error: e.message });
}

  res.send(category);
}

module.exports = CreateAbl;
