import "./css/CardList.css";
import { useState } from "react";


function CardList(props) {
    const [isFavorite, setIsFavorite] = useState(false);
  return (
    <li className="card">
      <div className="card__image">
        <img src={props.image} alt={props.alt} />
      </div>

      <div className="card__body">
        <p className="card__date">{props.date}</p>

        <h2 className="card__title">{props.title}</h2>

        <p className="card__author">By {props.author}</p>

        <p className="card__content">{props.content}</p>

        <p className="Favorite">
          <button className="Favorite__button" onClick={() => setIsFavorite(!isFavorite)}>
            {isFavorite ? "♥" : "♡"}
          </button>
        </p>

        <a href="#" className="card__link">
          Read More →
        </a>
      </div>
    </li>
  );
}

export default CardList;
