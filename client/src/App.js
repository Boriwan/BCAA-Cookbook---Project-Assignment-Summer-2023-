import NavbarComponent from "./components/Navbar/NavbarComponent";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import "./custom.scss";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home recipeList={recipeList} />} />
        <Route
          path="/pridat-recept"
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
