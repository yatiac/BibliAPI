const express = require("express");
const app = express();
const Database = require("sqlite-async");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


const constants = require("./constants.js");
const routes = require('./routes.js');
const swaggerDefinition  = require('./swagger.js');

const port = 3000;

var options = {
  swaggerDefinition,
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/", routes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () =>
  console.log(`BibliAPI listening at http://localhost:${port}`)
);
