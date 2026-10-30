import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "../css/FavoritesPage.css";
import "../css/Main.css";
import FavoritesContext from "../context/FavoritesContext";
import { useContext } from "react";
import NewsCard from "../components/NewsCard";

function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext);

  // Bug fix (navigation):
  //   The no-op `handleCategory` below was only there to satisfy the old
  //   `onCategoryChange` prop that <Navigation /> required. Navigation now
  //   changes the URL on its own, so the prop (and this dead function) is gone.
  return (
    <>
      <Header />
      <main className="favorites-main">
        <Navigation />
        <h2 dir="ltr">Favorites</h2>
        <ul className="news-list">
          {favorites.length === 0 && <h3>No favorites found</h3>}
          {favorites.map((newsItem) => (
            <NewsCard key={newsItem.id} {...newsItem} />
          ))}
        </ul>
      </main>

      <Footer />
    </>
  );
}

export default FavoritesPage;
