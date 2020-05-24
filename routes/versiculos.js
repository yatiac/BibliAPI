const express = require('express');
const router = express.Router();
const Database = require("sqlite-async");
const constants = require("../constants.js");
const queries = require("../queries.js");

router.get("/:abreviatura", async (req, res) => {
  const abreviatura = req.params.abreviatura.toUpperCase();  
  try {
    db = await Database.open(constants.DATABASE_NAME);
    response = await db.all(queries.GET_VERSICULO_BY_ABREVIATURA, { $abreviatura: abreviatura });
    response = response.reduce((r, a) => {
      r[a.capitulo] = [
        ...(r[a.capitulo] || []),
        { numero: a.versiculo, texto: a.texto },
      ];
      return r;
    }, {});
    response = Object.keys(response).length !== 0 ? response : constants.NOT_FOUND;
    db.close();
  } catch (error) {
    console.log(error);
  }
  res.send(response);
});

router.get("/:abreviatura/:capitulo/:versiculo", async (req, res) => {
  const abreviatura = req.params.abreviatura.toUpperCase();
  const capitulo = req.params.capitulo | 0;
  const versiculo = req.params.versiculo | 0;

  try {
    db = await Database.open(constants.DATABASE_NAME);
    response = await db.get(queries.GET_VERSICULO_BY_ABREVIATURA_CAPITULO_VERSICULO, {
      $abreviatura: abreviatura,
      $capitulo: capitulo,
      $versiculo: versiculo,
    });
    db.close();        
    response = Object.keys(response).length !== 0 ? response : constants.NOT_FOUND;
  } catch (error) {
    console.log(error);
  }
  res.send(response);
});

module.exports = router;