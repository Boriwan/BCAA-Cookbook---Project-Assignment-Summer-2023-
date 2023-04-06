const express = require("express");
const path = require("path");

const app = express();

// Serve image files from the 'storage/img' directory
app.use(
  "/server/storage/img",
  express.static(path.join(__dirname, "..", "..", "storage", "img"))
);

function GetImgAbl(req, res) {
  const { name } = req.params;
  res.sendFile(path.join(__dirname, "..", "..", "storage", "img", name));
}
module.exports = GetImgAbl;
