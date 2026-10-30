import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./assets/pages/HomePage.jsx";
import SearchPage from "./assets/pages/SearchPage.jsx";
import Navigation from "./assets/components/Navigation.jsx";
import "./App.css";
import FavoritesProvider from "./assets/context/FavoritesProvider.jsx";
import FavoritesPage from "./assets/pages/FavoritesPage.jsx";
import CategoryPage from "./assets/pages/CategoryPage.jsx";

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/:category" element={<CategoryPage />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
