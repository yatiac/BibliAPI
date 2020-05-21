# 📕API Para la Biblia Católica 
> Desarrollado por `Yatiac` con ayuda de `Alexis` y `GaboV`


# **Libros de la Biblia**

  Retorna un arreglo de objetos donde cada objeto es un libro de la Biblia. Cada libro contiene: id,nombre, abreviatura y cantidad de capítulos.

**URL:** `/libros/`

**Método:** `GET`

**Parámetros del URL:** None

## **Respuesta de éxito**
  **Código:** 200

  **Contenido:**
  
  ```json
  [
    { 
      "id": 1, 
      "nombre": "Génesis", 
      "abreviatura": "Gn", 
      "totalCapítulos": 50 
    }
    "..."   
  ]
  ```

## **Ejemplo:**

  http://localhost:3000/libros

# **Libro de la Biblia**
  Retorna un objeto que es un libro de la Biblia. Contiene: id,nombre, abreviatura y cantidad de capítulos.

**URL:** `/libros/{abreviatura}`

**Método:** `GET`

**Parámetros del URL:**

  >**Obligatorio:**  
  `abreviatura=[string]`

## **Respuesta de éxito**

  **Código:** 200
  
  **Contenido:** 
  ```json
  { 
    "id": 55, 
    "nombre": "Juan", 
    "abreviatura": "Jn", 
    "totalCapítulos": 21 
  }
  ```

## **Respuesta de error:**
  **Código:** `null`
  
  **Contenido:** 
  ```json
  { "message": "No se encontró lo que buscabas" }
  ```
  

## **Ejemplo:** 
http://localhost:3000/libros/Jn

# **Versículos de un libro de la Biblia**
   Retorna un diccionario de arreglos de objetos donde cada arreglo es un capítulo del libro de la Biblia solicitado. Cada objeto del arreglo es un versículo de este capítulo. Cada versículo contiene: numero y texto.

**URL:** `/versiculos/{abreviatura}`

**Método:** `GET`

**Parámetros del URL:**

  >**Obligatorio:**  
  `abreviatura=[string]`

## **Respuesta de éxito**

  **Código:** 200

  **Contenido:** 
  ```json
  {
    "1": 
    [
      {
            "numero": 1,
            "texto": "Profecía que Abdías recibió del Señor por revelación. Hemos oído un mensaje del Señor; un mensajero ha ido a las naciones, a decirles: «¡En marcha! ¡Vamos a la guerra contra Edom!» Dios el Señor le dice a Edom:"
        },
        {
            "numero": 2,
            "texto": "«Voy a hacerte pequeño entre las naciones y a humillarte en gran manera."
        },
        {
            "numero": 3,
            "texto": "Tu orgullo te ha engañado. Vives en las grietas de las peñas y habitas en las alturas, y por eso has llegado a creer que nadie puede derribarte."
        },
        {
            "numero": 4,
            "texto": "Pero aunque te eleves como el águila y pongas tu nido en las estrellas, de allí te haré caer.» El Señor afirma:"
        },
        {
            "numero": 5,
            "texto": "«Si los ladrones vinieran de noche a robarte, no se lo llevarían todo; si vinieran a ti los vendimiadores, algunos racimos dejarían. En cambio, tus enemigos te han destrozado por completo."
        },
        {
            "numero": 6,
            "texto": "¡Cómo te han saqueado, Esaú! ¡Han robado hasta el último de tus tesoros!"
        },
        {
            "numero": 7,
            "texto": "Todos tus aliados te engañaron; te echaron de tu propia tierra. Aun tus propios amigos se han puesto en contra tuya, y tus amigos de confianza te han tendido trampas. ¡Edom no tiene inteligencia!»"
        },
        {
            "numero": 8,
            "texto": "El Señor afirma: «El día en que yo castigue a Edom, destruiré a todos sus sabios y quitaré la inteligencia a los de la región montañosa de Esaú."
        },
        {
            "numero": 9,
            "texto": "Los guerreros de Temán temblarán de miedo, y en la región montañosa de Esaú no quedará nadie con vida."
        },
        {
            "numero": 10,
            "texto": "»Quedarás cubierto de vergüenza y destruido para siempre, por haber maltratado y matado a tu hermano Jacob."
        },
        {
            "numero": 11,
            "texto": "Cuando el enemigo saqueó las riquezas de la ciudad, cuando los soldados extranjeros rompieron las puertas de Jerusalén, ¡tú te hiciste a un lado! Cuando se rifaron sus despojos y se llevaron sus riquezas, ¡tú te portaste como uno de ellos!"
        },
        {
            "numero": 12,
            "texto": "No debiste alegrarte de ver a tu hermano en el día de su desgracia, ni debiste alegrarte de ver a Judá en el día de su ruina, ni debiste burlarte de ellos en el día de su angustia."
        },
        {
            "numero": 13,
            "texto": "No debiste entrar en mi ciudad el día de su sufrimiento, ni debiste alegrarte de su desgracia el día de su infortunio, ni debiste robar sus riquezas el día de su calamidad."
        },
        {
            "numero": 14,
            "texto": "No te debiste parar en las encrucijadas para matar a los que escapaban, ni debiste entregar a los que huían en el día de la angustia."
        },
        {
            "numero": 15,
            "texto": "Lo mismo que hiciste con otros, se hará contigo: ¡recibirás tu merecido! »Ya está cerca el día del Señor para todas las naciones."
        },
        {
            "numero": 16,
            "texto": "Como fue de amarga la copa que ustedes bebieron en mi santo monte, así de amarga será la copa que las demás naciones beberán sorbo a sorbo; y desaparecerán por completo."
        },
        {
            "numero": 17,
            "texto": "Pero el monte Sión será un lugar santo adonde algunos lograrán escapar. Los descendientes de Jacob recobrarán sus tierras;"
        },
        {
            "numero": 18,
            "texto": "los descendientes de Jacob y de José serán fuego y serán llama, y los de Esaú serán estopa que aquel fuego devorará completamente. ¡Ninguno de los de Esaú se salvará! Yo, el Señor, lo he dicho.»"
        },
        {
            "numero": 19,
            "texto": "Los israelitas del Négueb tomarán posesión de la región montañosa de Esaú, y los de la llanura se apoderarán del territorio de los filisteos. También tomarán posesión de las tierras de Efraín y del territorio de Samaria, y los de Benjamín se apoderarán de Galaad. Esta multitud de israelitas desterrados tomará posesión del territorio de los cananeos hasta Sarepta, y los cautivos de Jerusalén que están en Sefarad tomarán posesión de las ciudades del Négueb."
        },
        {
            "numero": 21,
            "texto": "Subirán victoriosos al monte Sión para dictar sentencia contra los de la región montañosa de Esaú, y el Señor será quien reine."
        }
    ]
  }
  ```
## **Respuesta de error:**

  **Código:** `null`
  
  **Contenido:** 
  ```json
  { "message": "No se encontró lo que buscabas" }
  ```

## **Ejemplo:**

  http://localhost:3000/versiculos/Abd


# **Versículo de la Biblia**
  Retorna un objeto que es un versículo de la Biblia. Contiene: numero y texto

**URL:** `/versiculos/{abreviatura}/{capitulo}/{versiculo}`

**Método:** `GET`

**Parámetros del URL**

>**Obligatorio:**  
  `abreviatura=[string]`  
  `capitulo=[integer]`  
  `versiculo=[integer]`

## **Respuesta de éxito**

  **Código:** 200

  **Contenido:** 
  ```json
  { 
    "numero":16,
    "texto":"»Pues Dios amó tanto al mundo, que dio a su Hijo único, para que todo aquel que cree en él no muera, sino que tenga vida eterna." 
  }
  ```

## **Respuesta de error:**

  **Código:** `null`
  
  **Contenido:** 
  ```json
  { "message": "No se encontró lo que buscabas" }
  ```

## **Ejemplo:**

   http://localhost:3000/versiculos/jn/3/16
   
# TODO
- [x] Documentar el API (responsable: Alexis y GaboV)
- [ ] Documentar los pasos para levantar el API en local
