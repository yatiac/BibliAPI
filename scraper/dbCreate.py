'''
    script args
        1:database
        2:queries.sql file
'''
import sys
import sqlite3
from sqlite3 import Error

db_file = sys.argv[1]
query_file = sys.argv[2]


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


def get_queries(path):
    with open(path, 'r') as f:
        table_queries = f.read()
        return table_queries.split(';')

table_queries = get_queries(query_file)
conn = create_connection(db_file)
if conn:
    for query in table_queries:    
        create_table(conn,query)
else:
    print('Connection failed')



# def insert(conn,query):
#     try:
#         cursor = conn.cursor()
#         cursor.execute(query)
#         conn.commit()
#     except Error as e:
#         print('Unable to insert...') 