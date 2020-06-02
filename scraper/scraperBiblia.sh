#!/bin/bash
JSON_FILE='../db/biblia.json'
SQL_CREATE_FILE='temp.sql'
DB_FILE='../db/biblia.db'

#1. Hacer el scrapping
echo "Ejecutando scraper...."
python scraper.py $JSON_FILE | tee logfile.log

#2. Crear la base de datos
echo "Creando base de dato...."
python dbCreate.py $DB_FILE $SQL_CREATE_FILE

#3. Poblar la base de datos
echo "Poblando la base de datos"
python dbInsert.py $JSON_FILE $DB_FILE