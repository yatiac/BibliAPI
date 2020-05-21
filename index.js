const express = require("express");
const app = express();
const Database = require("sqlite-async");

const port = 3000;

const DATABASE_NAME = "./dioshablahoy.sqlite";
const NOT_FOUND = { message: "No se encontró lo que buscabas" };

app.get("/libros/", async (req, res) => {
  const sql = `
    SELECT 
      id, 
      nome as nombre,
      abreviacao as abreviatura,
      qnt_capitulos as totalCapitulos    
    FROM
      livros
  `;
  try {
    const db = await Database.open(DATABASE_NAME);
    response = await db.all(sql);
    db.close();
    response = response.length > 0 ? response : NOT_FOUND;
  } catch (error) {
    console.log(error);
  }
  res.send(response);
});

app.get("/libros/:abreviatura", async (req, res) => {
  const abreviatura = req.params.abreviatura.toUpperCase();
  const sql = `
    SELECT
       id, 
      nome as nombre,
      abreviacao as abreviatura,
      qnt_capitulos as totalCapitulos   
    FROM 
      livros
    WHERE
      upper(abreviacao) = $abreviatura
    LIMIT 1
  `;
  try {
    const db = await Database.open(DATABASE_NAME);
    response = await db.get(sql, { $abreviatura: abreviatura });
    db.close();
    response = response ? response : NOT_FOUND;
  } catch (error) {
    console.log(error);
  }
  res.send(response);
});

app.get("/versiculos/:abreviatura", async (req, res) => {
  const abreviatura = req.params.abreviatura.toUpperCase();
  const sql = `
      SELECT 
        a.numero_capitulo as capitulo, 
        a.numero_versiculo as versiculo,
        a.texto as texto
      FROM 
        versiculos_fts a 
      INNER JOIN 
        livros b 
      ON 
        a.id_livro = b.id 
      AND 
        upper(b.abreviacao) =  $abreviatura
      WHERE
        a.is_title = 0
      ORDER BY 
        capitulo, versiculo
      `;
  try {
    db = await Database.open(DATABASE_NAME);
    response = await db.all(sql, { $abreviatura: abreviatura });
    response = response.reduce((r, a) => {
      r[a.capitulo] = [
        ...(r[a.capitulo] || []),
        { numero: a.versiculo, texto: a.texto },
      ];
      return r;
    }, {});
    response = Object.keys(response).length !== 0 ? response : NOT_FOUND;
    db.close();
  } catch (error) {
    console.log(error);
  }
  res.send(response);
});

app.get("/versiculos/:abreviatura/:capitulo/:versiculo", async (req, res) => {
  const abreviatura = req.params.abreviatura.toUpperCase();
  const capitulo = req.params.capitulo | 0;
  const versiculo = req.params.versiculo | 0;

  const sql = `
  SELECT 	
    a.numero_versiculo as numero,
    a.texto as texto
  FROM 
    versiculos_fts a 
  INNER JOIN 
    livros b 
  ON 
    a.id_livro = b.id 
  AND 
    upper(b.abreviacao) = $abreviatura
  AND
    a.numero_capitulo = $capitulo
  AND
    a.numero_versiculo = $versiculo
`;
  try {
    db = await Database.open(DATABASE_NAME);
    response = await db.all(sql, {
      $abreviatura: abreviatura,
      $capitulo: capitulo,
      $versiculo: versiculo,
    });
    db.close();        
    response = Object.keys(response).length !== 0 ? response : NOT_FOUND;
  } catch (error) {
    console.log(error);
  }
  res.send(response);
});

app.listen(port, () =>
  console.log(`BibliAPI listening at http://localhost:${port}`)
);
