module.exports = { 
  GET_ALL_LIBROS: `
    SELECT
      id, 
      nome as nombre,
      abreviacao as abreviatura,
      qnt_capitulos as totalCapitulos    
    FROM
      livros`,
  GET_LIBROS_BY_ABREVIATURA: `
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
  `,
  GET_VERSICULO_BY_ABREVIATURA: `
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
  `,
  GET_VERSICULO_BY_ABREVIATURA_CAPITULO_VERSICULO: `
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
    LIMIT 1
  `
}