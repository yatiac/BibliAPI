const express = require("express");
const app = express();
const Database = require("sqlite-async");
const constants = require("./constants.js");
const routes = require('./routes.js');

const port = 3000;

app.use("/", routes);

app.listen(port, () =>
  console.log(`BibliAPI listening at http://localhost:${port}`)
);
