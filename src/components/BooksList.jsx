import { BookCard } from "./BookCard";

export const BooksList = ({ books, loading, error, onFavorite }) => {
  
  if (loading) {
    return <p className="notice">Cargando libros...</p>;
  }

  if (error) {
    return <p className="notice notice--error">{error}</p>;
  }

  if (!books || books.length === 0) {
    return <p className="notice">Realiza una busqueda para encontrar libros.</p>;
  }
  
  return (
    <section className="results">
      {books.map((book) => (
        <BookCard key={book.key} book={book} onFavorite={onFavorite} />
      ))}
    </section>
  )
}
