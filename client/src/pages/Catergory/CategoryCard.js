import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const CategoryCard = ({ name, desc, id }) => {
  const [show, setShow] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDesc, setNewDesc] = useState(desc);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    fetch(`/category/delete/${id}`, {
      method: "delete",
    });
    setShow(false);
    window.location.reload();
  };
  const handleEdit = () => {
    const editedCategory = {
      name: newName,
      desc: newDesc,
      id: id,
    };
    console.log(editedCategory);
    fetch(`/category/update/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedCategory),
    });
    setShow(false);
    window.location.reload();
  };

  return (
    <div className="card m-3" key={id}>
      <h5 className="card-header">Kategorie</h5>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{desc}</p>
        <button
          className="btn btn-primary"
          style={{ color: "#FFFFFF" }}
          onClick={handleShowDelete}
        >
          Vymazat kategorii
        </button>
        <Modal show={showDelete} onHide={handleCloseDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Potvrzení vymazání</Modal.Title>
          </Modal.Header>
          <Modal.Body>Opravdu chcete tuto kategorii odstranit?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              style={{ color: "#FFFFFF" }}
              onClick={handleCloseDelete}
            >
              Zrušit
            </Button>
            <Button
              variant="danger"
              style={{ color: "#FFFFFF" }}
              onClick={handleDelete}
            >
              Vymazat
            </Button>
          </Modal.Footer>
        </Modal>
        <button
          className="btn btn-secondary ms-2"
          style={{ color: "#FFFFFF" }}
          onClick={handleShow}
        >
          Spravovat kategorii
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upravit kategorii</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Název</Form.Label>
              <Form.Control
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Popis</Form.Label>
              <Form.Control
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            style={{ color: "#FFFFFF" }}
            onClick={handleClose}
          >
            Zavřít
          </Button>
          <Button
            variant="secondary"
            style={{ color: "#FFFFFF" }}
            onClick={handleEdit}
          >
            Uložit změny
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryCard;
