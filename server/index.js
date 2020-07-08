const express = require('express');
const path = require("path");
const app = express();

const p = path.join(__dirname, "..", "dist");
console.log(p + "\n");

app.use(express.static(p));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

