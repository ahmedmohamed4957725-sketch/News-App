import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import '../css/FavoritesPage.css';
import '../css/Main.css';
import FavoritesContext  from '../context/FavoritesContext'
import {useContext} from 'react'
import NewsCard from '../components/NewsCard';

function FavoritesPage() {
const {favorites}=useContext(FavoritesContext)

const handleCategory=(category)=>{
    console.log(category);
    // setCategory(category);
}


console.log(favorites)
    return (
      <>
        <Header />
        <main className="favorites-main">
          <Navigation onCategoryChange={handleCategory} />
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
