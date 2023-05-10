import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Recipe from "./pages/Recipe/Recipe";
import App from "./App";
import NewRecipe from "./pages/NewRecipe/NewRecipe";
import EditRecipe from "./pages/EditRecipe/EditRecipe";
import Category from "./pages/Catergory/Category";
import AllRecipes from "./pages/AllRecipes/AllRecipes";
import Ingredients from "./pages/Ingredients/Ingredients";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/pridat-recept" element={<NewRecipe />} />
          <Route path="/kategorie" element={<Category />} />
          <Route path="/vsechny-recepty" element={<AllRecipes />} />
          <Route path="" element={<Home />} />
          <Route path="/ingredience" element={<Ingredients />} />
          <Route path="recept/:id" element={<Recipe />} />
          <Route path="upravit-recept/:id" element={<EditRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
