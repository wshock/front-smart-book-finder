# Endpoints:

## GET /books?title=aaa?author=aaa?language=aaa?publishedAfter=aaa

- Constraints:
- - Tiene que venir sí o sí o title o author
- - language y publishedAfter son opcionales
- - si se tiene language o publishedAfter filtrar correctamente por esos parámetros
- - de language solo se permite (ingles, español, portugués, frances y aleman).
- - publishedAfter no puede ser un año superior al actual (2026)
- - Retornar siempre los primeros 3 registros ordenados por cantidad de editions (de 
mayor a menor)
- - Si se llama a la api externa y se obtienen menos de 3 resultados tirar una exception

Atributos del JSON recibido de la API externa que nos importan (para poder armar el json de repuesta):
- title
- author_name
- cover_i
- edition_count
- first_publish_year
- key

JSON esperado (respuesta):

[
    {
        "title": "",
        "author_name": "",
        "first_publish_year": "",
        "edition_count": "",
        "cover_i": ""
    },
    {...},
    {...}
]

## POST /books/favorite/{key}

- Retornar un mensaje de respuesta q indique si se guardó correctamente el libro favorito o no.

### Entities:
- HistoryRecord:
- - Title
- - Author
- - language (solo se permite ingles, español, portugués, frances y aleman).
- - publishedAfter (menor q el año actual)


- FavoriteBook:
- - key

