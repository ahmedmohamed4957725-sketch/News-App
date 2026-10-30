import "../css/NewsCard.css";
import { useState } from "react";
import placeholder from "../images/placholder.jpg";
import FavoritesContext from "../context/FavoritesContext";
import { useContext } from "react";

function NewsCard(props) {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  const [isFavorite, setIsFavorite] = useState(() =>
    favorites.some((item) => item.id === props.id),
  );

  function handleToggleFavorite(e) {
    e.preventDefault();

    if (favorites.some((item) => item.id === props.id)) {
      removeFromFavorites(props);
      setIsFavorite(false);
    } else {
      addToFavorites(props);
      setIsFavorite(true);
    }
  }

  // Bug fix (error handling): if the article image is broken, fall back to the
  // local placeholder - but only ONCE. The old code tried to stop the loop
  // with `e.target.onError = null`, which is not a real DOM property (and React
  // uses its own event system anyway), so a missing AND failing placeholder
  // could re-trigger onError forever. A data flag is a reliable guard.
  function handleImageError(e) {
    const img = e.currentTarget;
    if (img.dataset.fallback) return;
    img.dataset.fallback = "true";
    img.src = placeholder;
  }

  return (
    <li dir="rtl">
      <section className="news-item-img">
        <img src={props.image} alt="news 1" onError={handleImageError} />
      </section>

      <section className="news-item-dat">
        <h3 className="news-title zain-bold">{props.title}</h3>

        {/* Bug fix (error handling): `published` is not always present, and
            `props.published.slice(...)` threw a TypeError that crashed the
            whole list. Guard before slicing. */}
        <p className="news-date">{(props.published || "").slice(0, 10)}</p>

        <p className="news-desc zain-light">{props.description}</p>

        {/* Link to the full article */}
        {/* Bug fix: without a url the link used to point at the literal
            string "undefined"; fall back to no navigation. */}
        <a href={props.url || "#"}>
          <button>Read More...</button>
        </a>

        {/* Favorite heart button */}
        <a href="#">
          <button
            onClick={handleToggleFavorite}
            className={isFavorite ? "fav" : ""}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </a>
      </section>
    </li>
  );
}

export default NewsCard;
