import { useState } from "react";

export const BookCard = ({ book, onFavorite }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleFavorite = async () => {
    if (!onFavorite) {
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      await onFavorite(book);
      setSaved(true);
    } catch (err) {
      setError(err?.message || "No se pudo guardar el favorito");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <article className="book-card">
      <div className="book-card__cover">
        <img
          src={book.coverImageUrl}
          alt={`${book.title} cover`}
          loading="lazy"
        />
      </div>
      <div className="book-card__content">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__meta">
          <span>Autor:</span> {book.author}
        </p>
        <p className="book-card__meta">
          <span>Idioma:</span> {book.language}
        </p>
        <p className="book-card__meta">
          <span>Publicado:</span> {new Date(book.publishedDate).toLocaleDateString()}
        </p>
        <div className="book-card__footer">
          <button
            className={`favorite-button${saved ? " favorite-button--saved" : ""}`}
            type="button"
            onClick={handleFavorite}
            disabled={isSaving || saved}
          >
            {saved ? "Guardado" : isSaving ? "Guardando..." : "Agregar a favoritos"}
          </button>
          {error && <p className="favorite-error">{error}</p>}
        </div>
      </div>
    </article>
  )
}
