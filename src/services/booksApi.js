export async function searchBooks({
    title = "",
    author = "",
    language = "",
    publishedAfter = ""
}) {
    const response = await fetch(
        "http://localhost:8080/books/search",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, author, language, publishedAfter })
        }
    );
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Error al buscar libros: " + errorData.error);
    }

    return response.json();
}

export async function markBookAsFavorite(bookKey) {
    const response = await fetch(
        `http://localhost:8080/books/favorites`,
        { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookKey }) 
        }
    );

    if (!response.ok) {
        throw new Error("Error al marcar libro como favorito");
    }

    return response.json();
}