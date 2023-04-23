import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavbarComponent() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src="http://localhost:8000/recipe/image/logo.svg"
            alt="Logo Pasta Cookbook"
            style={{ width: "100px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Domů</Nav.Link>
            <Nav.Link href="/pridat-recept">Přidat recept</Nav.Link>
            <NavDropdown title="Admin" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action2">
                Přidat Ingredienci
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action1">
                Vymazat Kategorii
              </NavDropdown.Item>

              <NavDropdown.Item href="#action3">
                Vymazat Ingredienci
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
