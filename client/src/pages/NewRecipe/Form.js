import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const AddRecipeForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [ingr, setIngr] = useState([]);
  const [cat, setCat] = useState([]);
  useEffect(() => {
    fetch("/ingredients")
      .then((response) => response.json())
      .then((ingredients) => setIngr(ingredients))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch("/categories")
      .then((response) => response.json())
      .then((categories) => setCat(categories))
      .catch((error) => console.error(error));
  }, []);
  const [multiSelections, setMultiSelections] = useState([]);
  const filed = multiSelections.map((multiSelections) => multiSelections.name);

  const ingredientListing = ingr.map((ingredient) => ingredient);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const [image, setImage] = useState(null);
  const [method, setMethod] = useState([""]);
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", measurement: "" },
  ]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", titleRef.current.value);
    formData.append("desc", descriptionRef.current.value);
    formData.append("method", JSON.stringify(method));
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("img", image);
    formData.append("prepLength", event.target.recipePrepTime.value);
    formData.append("finalAmount", event.target.portionCount.value);
    formData.append("categories", JSON.stringify(filed));

    fetch("/recipe/createRecipe", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const handleMethodChange = (event, index) => {
    const newMethod = [...method];
    newMethod[index] = event.target.value;
    setMethod(newMethod);
  };
  const handleAddStep = () => {
    setMethod([...method, ""]);
  };
  const handleRemoveStep = (index) => {
    const newMethod = [...method];
    newMethod.splice(index, 1);
    setMethod(newMethod);
  };
  const [mer, setMer] = useState([]);

  const handleIngredient = (event, index) => {
    const newIngredients = [...ingredients];
    const selectedIngredient = newIngredients[index];
    const selectedMeasurement = event.map((e) => e.measurement)[0];

    selectedIngredient.name = event.map((e) => e.name)[0];
    selectedIngredient.measurement = selectedMeasurement;
    const newMer = [...mer];
    newMer[index] = selectedMeasurement;
    setIngredients(newIngredients);
    setMer(newMer);
  };

  const handleMeasurementChange = (event, index) => {
    const newIngredients = [...ingredients];
    const selectedIngredient = newIngredients[index];
    selectedIngredient.measurement = event.target.value;
    const newMer = [...mer];
    newMer[index] = event.target.value;
    setIngredients(newIngredients);
    setMer(newMer);
    console.log(newMer);
  };

  const handleAmountChange = (event, index) => {
    const newIngredients = [...ingredients];
    const selectedIngredient = newIngredients[index];
    selectedIngredient.amount = event.target.value;
    setIngredients(newIngredients);
  };
  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", measurement: "" }]);
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px" }}
        className="mx-auto"
      >
        <Form.Group controlId="recipeTitle">
          <Form.Label>Název receptu</Form.Label>
          <Form.Control type="text" ref={titleRef} required />
        </Form.Group>
        <Form.Group controlId="recipeDescription">
          <Form.Label>Popis receptu</Form.Label>
          <Form.Control
            type="text"
            maxLength="120"
            ref={descriptionRef}
            required
          />
        </Form.Group>
        <Form.Group controlId="recipeMethod">
          <Form.Label>Postup přípravy receptu</Form.Label>
          {method.map((step, index) => (
            <div key={index} className="input-group mb-3">
              <span className="input-group-text">{index + 1}.</span>
              <Form.Control
                placeholder="popište postup přípravy receptu"
                type="text"
                value={step}
                onChange={(event) => handleMethodChange(event, index)}
                required
              />
              {index > 0 && (
                <Button
                  variant="danger"
                  onClick={() => handleRemoveStep(index)}
                >
                  X
                </Button>
              )}
            </div>
          ))}
          <Button variant="success" onClick={handleAddStep}>
            Přidat krok
          </Button>
        </Form.Group>
        <Form.Group controlId="recipeIngredients">
          <Form.Label>Ingredience</Form.Label>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <div className="input-group mb-3">
                <span className="input-group-text">{index + 1}.</span>
                <Typeahead
                  allowNew
                  id="basic-typeahead-single"
                  labelKey="name"
                  onChange={(event) => handleIngredient(event, index)}
                  options={ingredientListing}
                  newSelectionPrefix="Add a new item: "
                  placeholder="Vyberte ingredienci..."
                />

                <Form.Control
                  type="text"
                  placeholder="mnoství ingredience"
                  value={ingredient.amount}
                  onChange={(event) => handleAmountChange(event, index)}
                />
                <Form.Control
                  type="text"
                  placeholder="jednotka"
                  defaultValue={mer[index] ? mer[index] : ""}
                  onChange={(event) => handleMeasurementChange(event, index)}
                />
                {index > 0 && (
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    X
                  </Button>
                )}
              </div>
              {index === ingredients.length - 1 && (
                <Button variant="success" onClick={handleAddIngredient}>
                  Přidat ingredienci
                </Button>
              )}
            </div>
          ))}
        </Form.Group>
        <Form.Group controlId="recipeImage">
          <Form.Label>Obrázek</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} required />
        </Form.Group>
        <Form.Group controlId="recipePrepTime">
          <Form.Label>Doba přípravy</Form.Label>
          <Form.Control
            type="number"
            placeholder="Napište dobu přípravy receptu v minutách"
            min="1"
            required
          />
        </Form.Group>
        <Form.Group controlId="portionCount">
          <Form.Label>Počet porcí</Form.Label>
          <Form.Control
            type="number"
            placeholder="Napište čístlicí počet porcí"
            min="1"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Kategorie</Form.Label>
          <Typeahead
            id="basic-typeahead-multiple"
            labelKey="name"
            multiple
            onChange={setMultiSelections}
            options={cat}
            placeholder="Vyberte ze seznamu categorie..."
            selected={multiSelections}
          />
        </Form.Group>
        <Button variant="primary" className="mt-2" type="submit">
          Odeslat recept
        </Button>
      </Form>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recep byl vytvořen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Gratulujeme, recept byl úspěšně přidán!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Domů
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddRecipeForm;
