import { useState } from "react";

export const SearchForm = ({ onSearch, loading }) => {
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("");
  const [publishedAfter, setPublishedAfter] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title && !author && !language && !publishedAfter) {
      setError("Por favor, ingresa al menos un criterio de búsqueda");
      return;
    }
    if (publishedAfter && (isNaN(publishedAfter) || publishedAfter < 0) || publishedAfter > new Date().getFullYear()) {
      setError("El año de publicación debe ser un número válido");
      return;
    }
    if (!title.trim() && !author.trim()) {
      setError("Título o autor requeridos para realizar la búsqueda");
      return;
    }
    
    setError("");
    onSearch({ title, author, language, publishedAfter });
  }


  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__grid">
        <label className="field">
          <span>Titulo</span>
          <input
            type="text"
            placeholder="..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Autor</span>
          <input
            type="text"
            placeholder="..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Idioma</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="spa">Español</option>
            <option value="eng">Inglés</option>
            <option value="por">Portugués</option>
            <option value="fre">Francés</option>
            <option value="ger">Alemán</option>
          </select>
        </label>

        <label className="field">
          <span>Publicado despues de (año)</span>
          <input
            type="number"
            value={publishedAfter}
            onChange={(e) => setPublishedAfter(e.target.value)}
          />
        </label>
      </div>

      <div className="search-form__footer">
        {error && <p className="notice notice--error">{error}</p>}

        <button className="button" type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>
    </form>
  )
}
