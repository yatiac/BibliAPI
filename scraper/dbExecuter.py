'''
    script args
        1:sqlite file 
        2:create table queries
        3:action {create,insert}
'''
import sys
import sqlite3
from sqlite3 import Error

db_file = sys.argv[1]
query_file = sys.argv[2]
action = sys.argv[3]


def create_connection(path):
    try:
        return sqlite3.connect(path)
    except Error as e:
        print(e)
        return None

def create_table(conn, query):
    try:
        cursor = conn.cursor()
        cursor.execute(query)
    except Error as e:
        print('Unable to crate table...')

def insert(conn,query):
    try:
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
    except Error as e:
        print('Unable to insert...') 

def get_queries(path):
    with open(path, 'r') as f:
        table_queries = f.read()
        return table_queries.split(';')

table_queries = get_queries(query_file)
conn = create_connection(db_file)
if conn:
    if action.lower()=='create':
        for query in table_queries:    
            create_table(conn,query)
    elif action.lower()=='insert':
        for query in table_queries:
            insert(conn, query)
    else:
        print('Imvalid action...')
else:
    print('Connection failed')


