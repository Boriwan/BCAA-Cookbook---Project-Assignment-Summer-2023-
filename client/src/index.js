import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Recipe from "./pages/Recipe/Recipe";
import App from "./App";
import NewRecipe from "./pages/NewRecipe/NewRecipe";
import EditRecipe from "./pages/EditRecipe/EditRecipe";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/pridat-recept" element={<NewRecipe />} />
          <Route path="" element={<Home />} />
          <Route path="recept/:id" element={<Recipe />} />
          <Route path="upravit-recept/:id" element={<EditRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
