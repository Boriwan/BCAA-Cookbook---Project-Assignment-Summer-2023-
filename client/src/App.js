import NavbarComponent from "./components/Navbar/NavbarComponent";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Recipe from "./pages/Recipe/Recipe";
import Home from "./pages/Home/Home";
import Data from "./data/data.json";
import NewRecipe from "./pages/NewRecipe/NewRecipe";
import Footer from "./components/Footer/Footer";
import "./custom.scss";
function App() {
  const recipeList = Data.map((data) => data);
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pridat-recept" element={<NewRecipe />} />

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
