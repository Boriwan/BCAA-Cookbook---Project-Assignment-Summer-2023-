import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const CategoryCard = ({ name, desc, id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    fetch(`/category/delete/${id}`, {
      method: "delete",
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
        <button className="btn btn-primary" onClick={handleShow}>
          Vymazat kategorii
        </button>

        <button className="btn btn-secondary ms-2">Spravovat kategorii</button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this ingredient?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryCard;
