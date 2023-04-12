import NavbarComponent from "./components/Navbar/NavbarComponent";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Recipe from "./pages/Recipe/Recipe";
import Home from "./pages/Home/Home";
import NewRecipe from "./pages/NewRecipe/NewRecipe";
import Footer from "./components/Footer/Footer";
import "./custom.scss";
import { useEffect, useState } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch("/recipes")
      .then((response) => response.json())
      .then((recipes) => setRecipes(recipes))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch("/ingredients")
      .then((response) => response.json())
      .then((ingredients) => setIngredients(ingredients))
      .catch((error) => console.error(error));
  }, []);

  const ingredientList = ingredients.map((ingredient) => ingredient);
  const recipeList = recipes.map((data) => data);

  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home recipeList={recipeList} />} />
        <Route
          path="/createRecipe"
          element={<NewRecipe ingredients={ingredientList} />}
        />

        {recipeList.map((item) => (
          <Route
            path={`/recept/${item.id}`}
            key={item.id}
            element={<Recipe data={item} />}
          />
        ))}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
