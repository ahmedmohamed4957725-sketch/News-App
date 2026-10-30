import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchNews from "../components/SearchNews";
import Navigation from "../components/Navigation";
import "../css/SearchPage.css";
import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";

const API_KEY = "Iz_6HMfkQiQxXoQIvuLlwewNrTLf9KvcNc6LPucBAtWGSU4k";
const SEARCH_ENDPOINT = "https://api.currentsapi.services/v2/search?";
const LATEST_ENDPOINT = "https://api.currentsapi.services/v2/latest-news?";

// Currents expects `language` as a comma separated STRING of 2-letter codes.
// It is now chosen per request instead of being hard-coded to "ar":
//   - before a search -> DEFAULT_LANGUAGE (the landing "latest news" feed)
//   - during a search -> the language detected from the query itself
// so the user can type the search term in English OR Arabic.
const DEFAULT_LANGUAGE = "ar";

// Any character inside the Arabic Unicode block means the query is Arabic.
const ARABIC_REGEX = /[\u0600-\u06FF]/;

function detectLanguage(text) {
  return ARABIC_REGEX.test(text) ? "ar" : "en";
}

function SearchPage() {
  const [newsList, setNewsList] = useState([]);
  // Start loading: the page fetches the latest news on mount now.
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // An empty query is valid - it means "go back to the latest news feed".
  const handleSearch = (query) => {
    setSearchQuery(query.trim());
  };

  useEffect(() => {
    // ignore = discard a response that arrives after the user typed a newer
    // query (out-of-order responses) or after the component unmounted.
    let ignore = false;

    async function getNews() {
      try {
        setIsLoading(true);
        setError(null);

        // No query -> latest news. Query -> search results in the query's own
        // language (Arabic query -> ar, anything else -> en).
        const isSearch = searchQuery !== "";
        const endpoint = isSearch ? SEARCH_ENDPOINT : LATEST_ENDPOINT;

        const params = new URLSearchParams({
          language: isSearch ? detectLanguage(searchQuery) : DEFAULT_LANGUAGE,
          page_size: 20,
          page: 1,
        });

        // Only the search endpoint takes a `query`; sending an empty one makes
        // the API reject the request.
        if (isSearch) params.set("query", searchQuery);

        const response = await fetch(`${endpoint}${params}`, {
          headers: { Authorization: `Bearer ${API_KEY}` },
        });

        // Bug fix (error handling): the old code only had .then(), no
        // res.ok check and no .catch(), so failures were silent.
        if (!response.ok) {
          throw new Error(`Failed to load news (${response.status})`);
        }

        const data = await response.json();
        if (ignore) return;

        setNewsList(Array.isArray(data.news) ? data.news : []);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    getNews();

    return () => {
      ignore = true;
    };
  }, [searchQuery]);

  return (
    <>
      <Header />
      <Navigation />
      <main className="search-main">
        <h2 dir="ltr">
          {searchQuery ? `Search Results for: ${searchQuery}` : "Latest News"}
        </h2>

        <SearchNews onHandleSearch={handleSearch} />

        {/* mutually exclusive states (loading / error / empty results) */}
        {isLoading && <p>Loading articles...</p>}
        {!isLoading && error && <p>Error: {error}</p>}
        {!isLoading && !error && newsList.length === 0 && <p>No news found</p>}

        <ul className="news-list">
          {!isLoading &&
            !error &&
            newsList.map((newsItem) => (
              <NewsCard {...newsItem} key={newsItem.id} />
            ))}
        </ul>
      </main>

      <Footer />
    </>
  );
}

export default SearchPage;
