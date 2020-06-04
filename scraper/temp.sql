CREATE TABLE IF NOT EXISTS libros(
    id_libro INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    nombre VARCHAR,
    abreviacion VARCHAR, 
    testamento VARCHAR,
    qnt_capitulos INTEGER,
    qnt_versiculos INTEGER
);

CREATE TABLE IF NOT EXISTS capitulos(
    id_capitulo INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_libro INTEGER NOT NULL,
    numero_capitulo INTEGER,
    qnt_versiculos INTEGER,
    FOREIGN KEY (id_libro)
    REFERENCES libros(id_libro)
        ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS versiculos(
    id_versiculo INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_capitulo INTEGER NOT NULL,
    num_versiculo INTEGER,
    texto VARCHAR,
    FOREIGN KEY (id_capitulo)
    REFERENCES capitulos(id_capitulo)
        ON DELETE SET NULL
);