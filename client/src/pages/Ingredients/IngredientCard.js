import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const IngredientCard = ({ name, measurement, id }) => {
  const [show, setShow] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDesc, setNewDesc] = useState(measurement);
  const [showDelete, setShowDelete] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    return fetch(`/ingredient/delete/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          setShowDelete(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        setShowDelete(false);
        setShowError(true);
      });
  };

  const handleEdit = () => {
    const editedCategory = {
      name: newName,
      measurement: newDesc,
      id: id,
    };
    console.log(editedCategory);
    fetch(`/ingredient/update/${id}`, {
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
    <li
      className="list-group-item container d-flex justify-content-between"
      key={id}
    >
      <div className="row justify-content-between" style={{ width: "500px" }}>
        <span className="col-4 align-self-center">{name} </span>
        <span className="col align-self-center">
          <b className="me-2 ">Jednotka:</b>
          {measurement}
        </span>
      </div>
      <div>
        <button
          className="btn btn-primary me-2"
          style={{ color: "#FFFFFF" }}
          onClick={handleShowDelete}
        >
          Odstranit ingredienci
        </button>
        <Modal show={showDelete} onHide={handleCloseDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Potvrzení odstranění</Modal.Title>
          </Modal.Header>
          <Modal.Body>Opravdu chcete tuto ingredienci odstranit?</Modal.Body>
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
              Odstranit
            </Button>
          </Modal.Footer>
        </Modal>
        <button
          className="btn btn-secondary"
          style={{ color: "#FFFFFF" }}
          onClick={handleShow}
        >
          Upravit ingredienci
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Upravit ingredienci</Modal.Title>
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
                <Form.Label>Jednotka</Form.Label>
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
        <Modal show={showError} onHide={() => setShowError(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Kategorie nemůže být vymazána, protože v ní je zařazený recept
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowError(false)}>
              Zavřít
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </li>
  );
};

export default IngredientCard;
