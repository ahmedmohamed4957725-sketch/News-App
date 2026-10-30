import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchNews from "../components/SearchNews";
import Navigation from "../components/Navigation";
import "../css/SearchPage.css";
import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import FavoritesContext from "../context/FavoritesContext";
import { useContext } from "react";

function SearchPage() {
  const [newsList, setNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favList, setFavList] = useState([]);





  const key = "smicNIO2oDMTv2dQburWfibYTsbhBrcuHb1YDNQrDpSRpDUa";
  const endpoint = "https://api.currentsapi.services/v2/search?";

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    console.log(searchQuery);
  };

  const getNews = async (options) => {
    fetch(
      `${endpoint}language=${options.language}&page_size=${options.page_size}&query=${options.query}&page=${options.page}`,
      {
        headers: { Authorization: `Bearer ${key}` },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.news);
             setNewsList(data.news);
        setIsLoading(false);
      });
  };



  const { favorites, test } = useContext(FavoritesContext);
  console.log(favorites);
  console.log(test);

  useEffect(() => {
    let options = {
      language: "ar",
      page_size: 20,
      category: "",
      page: 1,
      type: 1,
      query: searchQuery,
    };



    getNews(options);
  }, [searchQuery]);

  const handleFavorite = (newsItemID) => {
    console.log(newsItemID);
    const newsItem = newsList.find((item) => item.id === newsItemID);
    console.log(newsItem);
    if (newsItem) {
      if (favList.includes((item) => item.id === newsItem.id)) {
        setFavList(favList.filter((item) => item.id !== newsItemID));
        console.log(favList);
      } else {
        setFavList([...favList, newsItem]);
        console.log(favList);
      }
    }
  };


  return (
    <>
      <Header />
      <Navigation />
      <main className="search-main">
        <h2 dir="ltr">{`Search Results for:  ${searchQuery}`}</h2>

        <SearchNews onHandleSearch={handleSearch} />
        {isLoading && <p>Loading articles...</p>}
        <ul className="news-list">
          {newsList.map((newsItem) => (
            <NewsCard
              {...newsItem}
              key={newsItem.id}
              onFavorite={handleFavorite}
            />
          ))}
        </ul>
      </main>

      <Footer />
    </>
  );
}

export default SearchPage;
