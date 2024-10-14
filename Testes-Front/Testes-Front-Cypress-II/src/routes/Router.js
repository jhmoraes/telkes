import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/favorites" element={<FavoritesPage />}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router