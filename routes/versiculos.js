const express = require('express');
const router = express.Router();
const Database = require("sqlite-async");
const constants = require("../constants.js");
const queries = require("../queries.js");

/**
 * @swagger
 * definitions:
 *  versiculo:
 *    type: object
 *    properties:
 *       numero:
 *         type: integer
 *         example: 3
 *       texto:
 *         type: string
 *         example: '»Pues Dios amó tanto al mundo, que dio a su Hijo único, para que todo aquel que cree en él no muera, sino que tenga vida eterna.'
 */

/**
 * @swagger
 * /versiculos/{abreviatura}:
 *    get:
 *      description: 'Retorna un diccionario de arreglos de objetos donde cada arreglo es un capítulo del libro de la Biblia solicitado. Cada objeto del arreglo es un versículo de este capítulo. Cada versículo contiene\: número y texto.'
 *      parameters:
 *        - name: abreviatura
 *          in: path
 *          required: true
 *          description: Abreviatura del libro a buscar (ej Gn, Ex, Sal, etc..)
 *          type: string
 *      responses:
 *        200:
 *          schema:
 *            $ref: '#/definitions/versiculo'
 */
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

/**
 * @swagger
 * /versiculos/{abreviatura}/{capitulo}/{versiculo}:
 *    get:
 *      description: 'Retorna un objeto que es un versículo de la Biblia. Contiene\: numero y texto'
 *      parameters:
 *        - name: abreviatura
 *          in: path
 *          required: true
 *          description: Abreviatura del libro a buscar (ej Gn, Ex, Sal, etc..)
 *          type: string
 *        - name: capitulo
 *          in: path
 *          required: true
 *          description: Capíulo del libro a buscar (ej 3, 4, 10, etc..)
 *          type: integer
 *        - name: versiculo
 *          in: path
 *          required: true
 *          description: Versiculo del libro a buscar (ej 16, 13, 12, etc..)
 *          type: integer
 *      responses:
 *        200:
 *          schema:
 *            $ref: '#/definitions/versiculo'
 */
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

router.get("/:abreviatura/:capitulo", async (req, res) => { 
  const abreviatura = req.params.abreviatura.toUpperCase();
  const capitulo = req.params.capitulo | 0;
  response=[];
  try { 
    db = await Database.open(constants.DATABASE_NAME); 
    response = await db.all(queries.GET_CAPITULO_BY_ABREVIATURA, {
      $abreviatura: abreviatura,
      $capitulo: capitulo
    });
    db.close();
    response = response.length > 0 ? response : constants.NOT_FOUND;
  } catch (error) { 
    console.log(error);
  }
  res.send(response);
});

module.exports = router;