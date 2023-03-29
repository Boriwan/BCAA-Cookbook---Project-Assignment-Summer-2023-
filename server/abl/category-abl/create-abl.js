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

  try {
    category = dao.create(category);
  } catch (e) {
    // if (e.id === "DUPLICATE_CODE") {
    //   res.status(400);
    // } else {
    //   res.status(500);
    // }
    res.status(500);
    return res.json({ error: e.message });
  }

  res.send(category);
}

module.exports = CreateAbl;
