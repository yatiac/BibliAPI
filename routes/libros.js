const express = require('express');
const router = express.Router();
const Database = require("sqlite-async");
const constants = require("../constants.js");
const queries = require("../queries.js");

/**
 * @swagger
 * definitions:
 *  libro:
 *    type: object
 *    properties:
 *       id:
 *         type: integer
 *         example: 1
 *       nombre:
 *         type: string
 *         example: 'Génesis'
 *       abreviatura:
 *         type: string
 *         example: 'Gn'
 *       totalCapitulos:
 *         type: integer
 *         example: 50
 * 
 */

/**
 * @swagger
 * /libros:
 *    get:
 *      description: 'Retorna un arreglo de objetos donde cada objeto es un libro de la Biblia. Cada libro contiene: id,nombre, abreviatura y cantidad de capítulos.'
 *      responses:
 *        200:
 *          description: ''
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/libro'
 */
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

/**
 * @swagger
 * /libros/{abreviatura}:
 *    get:
 *      description: 'Retorna un objeto que es un libro de la Biblia. Contiene\: id,nombre, abreviatura y cantidad de capítulos.'
 *      parameters:
 *        - name: abreviatura
 *          in: path
 *          required: true
 *          description: Abreviatura del libro a buscar (ej Gn, Ex, Sal, etc..)
 *          type: string
 *      responses:
 *        200:
 *          schema:
 *            $ref: '#/definitions/libro'
 */
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