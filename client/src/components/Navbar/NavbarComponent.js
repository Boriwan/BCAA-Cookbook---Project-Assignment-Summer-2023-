import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavbarComponent.css";

function NavbarComponent() {
  return (
    
    <Navbar bg="light" expand="lg">
      
      <Container fluid className="navbar-flex">

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" style={{width: "100%", justifyContent: "space-evenly"}}>
          <div style={{paddingLeft: "15px"}}>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px"}}
            navbarScroll
          >
            <Nav.Link href="/">Všechny recepty</Nav.Link>
            <Nav.Link href="/pridat-recept">Kategorie</Nav.Link>
            <Nav.Link href="/pridat-recept">Ingredience</Nav.Link>
            
          </Nav>
          </div>
          
          <div >
            <Navbar.Brand href="/">
              <img
                src="img/logo.svg"
                alt="Logo Pasta Cookbook"
                style={{ width: "100px" }}
              />
            </Navbar.Brand>
          </div>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          
          
          <Button href="/pridat-recept"style={{position: "absolute", float: "right", right: 0, marginRight: "50px"}} className="btn btn-success">Přidat recept</Button>
          
        </Navbar.Collapse>
        
      </Container>
    </Navbar>

  );
}

export default NavbarComponent;
