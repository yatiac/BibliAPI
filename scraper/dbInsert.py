import json
import sys
import sqlite3
from sqlite3 import Error

JSON_FILE = sys.argv[1] #File path as argument
DB_FILE = sys.argv[2]
# DB_FILE = '../db/test.db'
# JSON_FILE = 'data.json'


#----------------Queries------------
def GetBookQuery(libro,datos):
    return f'''
        INSERT INTO libros ( 
                nombre, 
                abreviacion, 
                testamento, 
                qnt_capitulos, 
                qnt_versiculos
            )
             VALUES (
                "{libro}",
                "{datos['abreviacion']}",
                "{datos['testamento']}",
                {datos['ctd_chapters']},
                {datos['ctd_verses']}
            );
            '''.replace('\n','').replace('  ','')

def GetChapterQuery(chapter, id_libro):
    return  f'''
            INSERT INTO capitulos (             
                id_libro, 
                numero_capitulo,  
                qnt_versiculos
            )
             VALUES (
                {id_libro},
                {chapter['chapter']},
                {chapter['ctd_verses']}
            );
            '''.replace('\n','').replace('  ','')

def GetVerseQuery(num,verse,chapter_id):
    return  f'''
            INSERT INTO versiculos (                 
                id_capitulo, 
                num_versiculo,  
                texto
            )
             VALUES (
                {chapter_id},
                {num},
                '{verse}'
            );
            '''.replace('\n','').replace('  ','')


#-------------Menejo de DB----------------------
def create_connection(path):
    try:
        return sqlite3.connect(path)
    except Error as e:
        print(e)
        return None

def executeInsert(query,cursor):
    try: 
        cursor.execute(query)
    except Error as e:
        print(e)
        print(query)

def getIdLibro(libro,cursor):
    query_id = f'SELECT id_libro FROM libros WHERE nombre = "{libro}";'
    cursor.execute(query_id)
    return cursor.fetchone()[0]


def getIdChapter(id_libro, chapter,cursor):
    query_id = f'SELECT id_capitulo FROM capitulos WHERE id_libro = {id_libro} and numero_capitulo = {chapter};'
    cursor.execute(query_id)
    #print(cursor.fetchone()[0])
    return cursor.fetchone()[0]

#--------------Funcion principal--------------
def insertions(json_file,cursor):
    #1. for each book insert book
    for libro,datos in json_file.items():
        query_libro = GetBookQuery(libro, datos) 
        executeInsert(query_libro,cursor)
        
        id_libro = getIdLibro(libro,cursor)
        #2. for each chapter insert chapter
        for chapter in datos['chapters']:
            query_chapter = GetChapterQuery(chapter,id_libro)
            executeInsert(query_chapter,cursor)
            
            id_chapter = getIdChapter(id_libro,chapter['chapter'],cursor)
            #3. for each versicle insert versicle
            for versenum, verse in chapter['verses'].items():
                query_verse = GetVerseQuery(versenum, verse, id_chapter)
                executeInsert(query_verse, cursor)

    pass


with open(JSON_FILE, encoding='utf-8') as json_file:
    data = json.load(json_file)

conn = create_connection(DB_FILE)
if conn:
    cursor = conn.cursor()
    insertions(data,cursor)
    conn.commit()
    conn.close()
else:
    print('Connection failed')
