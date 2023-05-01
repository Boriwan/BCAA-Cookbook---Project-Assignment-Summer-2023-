import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import IngredientCard from "./IngredientCard";

const IngredientsView = ({ ingredientsList }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [filteredIngredients, setFilteredIngredients] =
    useState(ingredientsList);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const formData = new FormData();
    event.preventDefault();

    formData.append("name", name);
    formData.append("measurement", measurement);

    fetch("/ingredient/create", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    handleClose();
    window.location.reload();
  };

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = ingredientsList.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm)
    );
    setFilteredIngredients(filtered);
  };

  return (
    <main className="max-width">
      <h1 className=" text-primary h1">Všechny Ingredience</h1>
      <div className=" mx-5 mb-2">
        <button
          type="button"
          className="btn btn-primary mb-2"
          onClick={handleShow}
        >
          Přidat ingredienci
        </button>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Filtrovat podle názvu"
          onChange={handleFilter}
          style={{ maxWidth: "400px" }}
        />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Přidat novou ingredienci</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Název ingredience</Form.Label>
              <Form.Control
                type="text"
                placeholder="Napište název ingredience"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Jednotka měření</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zapište jednotku měření"
                value={measurement}
                onChange={(event) => setMeasurement(event.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-1">
              Uložit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="max-width">
        <div className="card mx-5">
          <ul className="list-group list-group-flush">
            {filteredIngredients.map((ingredient) => {
              return (
                <IngredientCard
                  name={ingredient.name}
                  measurement={ingredient.measurement}
                  id={ingredient.id}
                  key={ingredient.id}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default IngredientsView;
