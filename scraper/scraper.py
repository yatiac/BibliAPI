import unicodedata
import sys
import json
import requests
from bs4 import BeautifulSoup

JSON_FILE = sys.argv[1]


url_base = 'https://www.bibliacatolica.com.br/la-biblia-de-jerusalen/'

def log(msg):
    print(msg)
    sys.stdout.flush()


def getSoup(url):
    r = requests.get(url)
    if (r.status_code == 200):
        return BeautifulSoup(r.text, 'html5lib')
    else:
        print('Error en el request....')
        return None

def getExtras(i):
    abreviaturas = [
        'Gn','Ex','Lv', 'Nm', 'Dt', 'Jos', 'Jue', 'Rut', '1 Sam', '2 Sam',
        '1 Re', '2 Re', '1 Cr', '2 Cr', 'Esd', 'Ne', 'Tb', 'Jdt', 'Est',
        'Job', 'Sl', '1 Mac', '2 Mac', 'Pr', 'Qo', 'Ct', 'Sb', 'Sir', 'Is',
        'Jr', 'Lm', 'Ba', 'Ez', 'Dn', 'Os', 'Jl', 'Am', 'Ab', 'Jon', 'Mi', 
        'Na', 'Ha', 'So', 'Ag', 'Za', 'Ml', 'Mt', 'Mc', 'Lc', 'Jn', 'He',
        'Rm', '1 Cor', '2 Cor', 'Ga', 'Ef', 'Flp', 'Col', '1 Te', '2 Te',
        '1 Tim', '2 Tim', 'Tit', 'Flm', 'Heb', 'Sant', '1 Pe', '2 Pe', 
        '1 Jn', '2 Jn', '3 Jn', 'Jds', 'Ap'
        ]
    # Get testamento
    if i < 46:
        test = 'Antiguo'
    else: 
        test = 'Nuevo'

    return (test, abreviaturas[i])


#1. Get books links
def getBookLinks(url):
    #Just logging
    log('Extracting book names...')
    #Request to bible to get book names
    libros_soup = getSoup(url+'genesis/1') #Get soup | usamos genesis/1 como placeholder
    secc = libros_soup.find('select', attrs={'class': 'livros'}) #Get libros seccion
    libros = secc.get_text().strip().split('\n')  #Get only the bible books

    #Setting the books dictionary
    dict_libros = {} 
    for i,libro in enumerate(libros):
        #Format the books name to use in the url
        libro_unaccent = unicodedata.normalize('NFD', libro).encode('ascii','ignore').decode('utf-8')
        libro_unaccent = libro_unaccent.lower().strip().replace(' ','-')

        dict_libros[libro] = {
            'url_libro' : url + libro_unaccent,
            'abreviacion': '',
            'testamento': '',
            'ctd_chapters' : 0,
            'ctd_verses': 0,
            'chapters' : {}
        }
        dict_libros[libro]['testamento'], dict_libros[libro]['abreviacion'] = getExtras(i)
    return dict_libros

#2. Get chapter count per book
def getChapters(dict_libros):
    log('Extracting book chapters...')
    for name,libro in dict_libros.items():
        log(f'\tfrom {name} ...')
        chapter_soup = getSoup(libro['url_libro']+'/1') #Usamos el capitulo 1 de placeholder
        seccs = chapter_soup.find('ul', attrs={'class':'listChapter'}).find_all('li')
        libro['ctd_chapters'] = len(seccs)
        chapters = []
        for sec in seccs:
            chapters.append({
                'chapter' : sec.a.text,
                'url_chapter' : sec.a.get('href'),
                'ctd_verses': 0,
                'verses': {}
            })
        libro['chapters'] = chapters
    return dict_libros


#3. Use links to get texts
def getVerses(dict_libros):
    log('Extracting chapters verses...')
    for name,libro in dict_libros.items():
        log(f'\tfrom {name} ...')
        ctd_verses = 0 
        for chapter in libro['chapters']:
            verses_soup = getSoup(chapter['url_chapter'])
            seccs = verses_soup.find('article', attrs={'bibleChapter'}).find_all('p')
            verses = {}
            for sec in seccs:
                verses[sec.get('data-v')] = sec.span.text
            chapter['verses'] = verses
            chapter['ctd_verses'] = len(seccs)
            ctd_verses+=len(seccs)
        libro['ctd_verses'] = ctd_verses
    return dict_libros

#4. Save content in JSON
def jsonify(dict_libros):
    with open(JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(dict_libros, f)

#-------------------------MAIN
libros = getVerses(getChapters(getBookLinks(url_base)))
jsonify(libros)
