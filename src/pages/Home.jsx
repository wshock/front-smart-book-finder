import { useState } from "react";
import { markBookAsFavorite, searchBooks } from "../services/booksApi";
import { SearchForm } from "../components/SearchForm";
import { BooksList } from "../components/BooksList";

export const Home = () => {
  const booksQuemados = [
    {
      title: "Cien años de soledad",
      author: "Gabriel Garcia Marquez",
      language: "spa",
      publishedDate: "1967-05-30",
      cover_i: 240727,
      coverImageUrl: "https://covers.openlibrary.org/b/id/240727-M.jpg",
      edition_count: 87,
      key: "/works/OL45883W",
    },
    {
      title: "The Name of the Rose",
      author: "Umberto Eco",
      language: "eng",
      publishedDate: "1980-01-01",
      cover_i: 10521213,
      coverImageUrl: "https://covers.openlibrary.org/b/id/10521213-M.jpg",
      edition_count: 54,
      key: "/works/OL82563W",
    },
    {
      title: "Os Lusiadas",
      author: "Luis de Camoes",
      language: "por",
      publishedDate: "1572-01-01",
      cover_i: 10909229,
      coverImageUrl: "https://covers.openlibrary.org/b/id/10909229-M.jpg",
      edition_count: 31,
      key: "/works/OL98592W",
    },
  ];

  const [books, setBooks] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchParams) => {
    try {
      setLoading(true);
      setError("");

      // const results = await searchBooks(searchParams);
      const results = booksQuemados;
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
