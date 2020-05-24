const express = require('express');
const router = express.Router();
const Database = require("sqlite-async");
const constants = require("../constants.js");
const queries = require("../queries.js");

router.get('/', async function(req, res){   
  try {
    const db = await Database.open(constants.DATABASE_NAME);
    response = await db.all(queries.GET_ALL_LIBROS);
    db.close();
    response = response.length > 0 ? response : constants.NOT_FOUND;
  } catch (error) {
    console.log(error);
  }
  res.send(response);
});

router.get("/:abreviatura", async (req, res) => {
  const abreviatura = req.params.abreviatura.toUpperCase();  
  try {
    const db = await Database.open(constants.DATABASE_NAME);
    response = await db.get(queries.GET_LIBROS_BY_ABREVIATURA, { $abreviatura: abreviatura });
    db.close();
    response = response ? response : constants.NOT_FOUND;
  } catch (error) {
    console.log(error);
  }
  res.send(response);
});


module.exports = router;