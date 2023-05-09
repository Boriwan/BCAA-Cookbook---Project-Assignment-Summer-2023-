import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Typeahead } from "react-bootstrap-typeahead";
import Logo from "../../img/logo.svg";
import "./NavbarComponent.css";

function NavbarComponent() {
  const [searchValue, setSearchValue] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchStarted, setSearchStarted] = useState(false);

  useEffect(() => {
    if (searchStarted) {
      fetch("http://localhost:3000/recipe/list").then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          console.error(responseJson);
        } else {
          setRecipes(responseJson);
        }
      });
    }
  }, [searchStarted]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchValue) {
      window.location.href = `/recept/${searchValue[0].id}`;
    } else {
      console.error(`Recipe with name "${searchValue}" not found`);
    }
  };

  const handleSearchInputChange = (input) => {
    setSearchStarted(true);
    setSearchValue(input);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid className="navbar-flex">
        <Navbar.Brand href="/" className="display-small">
          <img
            src={Logo}
            alt="Logo Pasta Cookbook"
            style={{ width: "100px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse
          id="navbarScroll"
          style={{ width: "100%", justifyContent: "space-evenly" }}
        >
          <div className="ps-2 mb-2">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
            >
              <Nav.Link href="/vsechny-recepty">Všechny recepty</Nav.Link>
              <Nav.Link href="/kategorie">Kategorie</Nav.Link>
              <Nav.Link href="/ingredience">Ingredience</Nav.Link>
            </Nav>
          </div>

          <Navbar.Brand href="/" className="display-large">
            <img
              src={Logo}
              alt="Logo Pasta Cookbook"
              style={{ width: "100px" }}
            />
          </Navbar.Brand>
          <div className="d-lg-flex ">
            <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <Typeahead
                id="recipe-search"
                labelKey="name"
                options={recipes}
                placeholder="Hledejte recepty"
                onChange={setSearchValue}
                searchText={searchValue}
                onInputChange={handleSearchInputChange}
              />
              <Button
                type="submit"
                variant="outline-success"
                className="ms-lg-1"
              >
                Hledat
              </Button>
            </Form>

            <Button href="/pridat-recept" className="btn btn-success ms-lg-2">
              Přidat recept
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
