import { useState } from "react";
import { markBookAsFavorite, searchBooks } from "../services/booksApi";
import { SearchForm } from "../components/SearchForm";
import { BooksList } from "../components/BooksList";

export const Home = () => {

  const [books, setBooks] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchParams) => {
    try {
      setLoading(true);
      setError("");

      const results = await searchBooks(searchParams);
      setBooks(results);
    } catch (err) {
      setBooks(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleFavorite = async (book) => {
    if (!book?.key) {
      throw new Error("Libro sin key para favoritos");
    }

    const normalizedKey = encodeURIComponent(book.key.replace(/^\/+/, ""));
    return markBookAsFavorite(normalizedKey);
  }

  

  return (
    <div className="page">
      <header className="page__header">
        <h1>Smart Book Finder</h1>
        <p className="subtitle">
          Encuentra libros por titulo y/o autor, filtra por idioma y/o fecha de publicacion.
        </p>
      </header>

      <section className="panel">
        <SearchForm onSearch={handleSearch} loading={loading} />
      </section>

      <BooksList
        books={books}
        loading={loading}
        error={error}
        onFavorite={handleFavorite}
      />
    </div>
  )
}
