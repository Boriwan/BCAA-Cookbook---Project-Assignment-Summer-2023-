import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../img/logo.svg";
import "./NavbarComponent.css";
import { useEffect, useState } from "react";

function NavbarComponent() {
  const [CallGetRecipe, setCallGetRecipe] = useState();
  useEffect(() => {
    fetch(`recipe/list`).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setCallGetRecipe({ state: "error", error: responseJson });
      } else {
        setCallGetRecipe({ state: "ready", data: responseJson });
      }
    });
  });
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
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>

            <Button
              href="/pridat-recept"
              // style={{
              //   float: "right",
              //   right: 0,
              //   marginRight: "50px",
              // }}
              className="btn btn-success ms-lg-2"
            >
              Přidat recept
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
