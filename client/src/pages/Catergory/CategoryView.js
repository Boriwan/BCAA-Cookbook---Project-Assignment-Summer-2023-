import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import CategoryCard from "./CategoryCard";

const CategoryView = ({ data }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const formData = new FormData();
    event.preventDefault();

    formData.append("name", name);
    formData.append("desc", description);

    fetch("/category/create", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    handleClose();
    window.location.reload();
  };

  return (
    <main className="max-width">
      <h1 className=" text-primary h1 mx-3">Všechny kategorie</h1>
      <button
        type="button"
        className="btn btn-secondary ms-3"
        style={{ color: "#FFFFFF" }}
        onClick={handleShow}
      >
        Přidat kategorii
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Přidat novou kategorii</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Název kategorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Krátký popisek kategorie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              style={{ color: "#FFFFFF" }}
              type="submit"
              className="mt-1"
            >
              Uložit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <div>
        {data.map((category) => {
          return (
            <CategoryCard
              name={category.name}
              desc={category.desc}
              id={category.id}
              key={category.id}
            />
          );
        })}
      </div>
    </main>
  );
};

export default CategoryView;
