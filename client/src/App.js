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
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
