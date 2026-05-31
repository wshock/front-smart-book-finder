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
        throw new Error("Error al buscar libros");
    }

    return response.json();
}

export async function markBookAsFavorite(bookId) {
    const response = await fetch(
        `http://localhost:8080/api/books/favorite/${bookId}`,
        { method: "POST" }
    );

    if (!response.ok) {
        throw new Error("Error al marcar libro como favorito");
    }

    return response.json();
}