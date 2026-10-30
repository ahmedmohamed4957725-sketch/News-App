import "../css/Main.css";
import NewsCard from "./NewsCard";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation";

// Currents expects `language` as a comma separated STRING of 2-letter codes.
const LANGUAGE = "ar";
const API_KEY = "Iz_6HMfkQiQxXoQIvuLlwewNrTLf9KvcNc6LPucBAtWGSU4k";
const ENDPOINT = "https://api.currentsapi.services/v2/latest-news?";

function Main() {
  // Bug fix (category):
  //   The selected category used to live in a local state that was fed by an
  //   `onCategoryChange` callback. But "/:category" is a different route, so
  //   navigating unmounted this component and the new instance started from
  //   "" again - the chosen category was lost, and the `category` prop that
  //   CategoryPage passes in was ignored.
  //   The URL is now the single source of truth: useParams() reads the same
  //   ":category" value for the home route ("/", no param -> "") and for the
  //   category route ("/health" -> "health").
  const { category = "" } = useParams();

  const [newsList, setNewsList] = useState([]);
  // Bug fix (loading): start empty. The previous code started at `true` and
  // only ever turned it off, so a second category never showed a loader.
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Bug fix (error handling / loading):
    //   `ignore` protects against out-of-order responses: if the user clicks
    //   another category while a request is still in flight, the older answer
    //   must not overwrite the newer one. It also prevents React from setting
    //   state on a component that has already been unmounted.
    let ignore = false;

    async function getNews() {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams({
          language: LANGUAGE,
          page_size: 20,
          page: 1,
        });

        // Bug fix (category): only send `category` when one is selected.
        // The home feed used to send an empty "category=" and the API
        // rejected the request, so "Latest News" never loaded.
        if (category) {
          params.set("category", category);
        }

        const response = await fetch(`${ENDPOINT}${params}`, {
          headers: { Authorization: `Bearer ${API_KEY}` },
        });

        // Bug fix (error handling): the old code called .json() blindly and
        // had no .catch(), so a failed request threw an unhandled rejection
        // and left the page stuck on "Loading...".
        if (!response.ok) {
          throw new Error(`Failed to load news (${response.status})`);
        }

        const data = await response.json();
        if (ignore) return;

        // The API can answer without a `news` key; keep the state an array.
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
  }, [category]);

  return (
    <main id="mn">
      {/* Navigation now navigates only - it reads the category from the URL
          itself, so no callback has to be passed down. */}
      <Navigation />

      <section>
        <h2 dir="ltr">
          {category ? category.replace(/_/g, " ") : "Latest News"}
        </h2>

        <ul className="news-list">
          {/* Bug fix (loading): these three states are now mutually exclusive.
              Before, "Loading..." and "No news found" were both rendered on
              the first render because the list was empty while loading. */}
          {isLoading && <h3>Loading...</h3>}
          {!isLoading && error && <h3>Error: {error}</h3>}
          {!isLoading && !error && newsList.length === 0 && (
            <h3>No news found</h3>
          )}
          {!isLoading &&
            !error &&
            newsList.map((newsItem) => (
              <NewsCard {...newsItem} key={newsItem.id} />
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
