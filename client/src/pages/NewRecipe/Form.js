import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { Link } from "react-router-dom";

const AddRecipeForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [ingr, setIngr] = useState([]);
  let [newData, setNewData] = useState(null);
  const [cat, setCat] = useState([]);

  useEffect(() => {
    fetch("/ingredient/list")
      .then((response) => response.json())
      .then((ingredients) => setIngr(ingredients))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch("/category/list")
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

  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isDescValid, setIsDescValid] = useState(false);
  const [isMethodValid, setIsMethodValid] = useState(false);
  const [isPortionsValid, setIsPortionsValid] = useState(false);
  const [isPrepLengthValid, setIsPrepLengthValid] = useState(false);

  const setPortionChange = (e) => {
    setIsPortionsValid(e.target.value !== "");
  };
  const handleTitleChange = (e) => {
    setIsTitleValid(e.target.value !== "");
  };
  const handleDescChange = (e) => {
    setIsDescValid(e.target.value !== "");
  };
  const setPrepLengthChange = (e) => {
    setIsPrepLengthValid(e.target.value !== "");
  };

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
    if (!handleIngredient) {
      alert("Please select an option");
      return;
    }

    fetch("/recipe/create", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => setNewData(data))
      .catch((error) => console.error(error));
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const handleMethodChange = (event, index) => {
    const newMethod = [...method];
    newMethod[index] = event.target.value;
    setMethod(newMethod);
    setIsMethodValid(event.target.value !== "");
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
    console.log(ingredients);
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
          <Form.Label>
            <span className={isTitleValid ? "text-success" : "text-danger"}>
              *
            </span>
            Název receptu
          </Form.Label>
          <Form.Control
            type="text"
            ref={titleRef}
            required
            onChange={handleTitleChange}
          />
        </Form.Group>
        <Form.Group controlId="recipeDescription">
          <Form.Label>
            <span className={isDescValid ? "text-success" : "text-danger"}>
              *
            </span>
            Popis receptu
          </Form.Label>
          <Form.Control
            type="text"
            maxLength="120"
            ref={descriptionRef}
            onChange={handleDescChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="recipeMethod">
          <Form.Label>
            <span className={isMethodValid ? "text-success" : "text-danger"}>
              *
            </span>
            Postup přípravy receptu
          </Form.Label>
          {method.map((step, index) => (
            <div key={index} className="input-group mb-3">
              <span className="input-group-text">{index + 1}.</span>
              <Form.Control
                placeholder="Popište postup přípravy receptu"
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
          <Form.Label>
            <span
              className={
                ingredients.length > 1 ? "text-success" : "text-danger"
              }
            >
              *
            </span>
            Ingredience
          </Form.Label>
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
                  isInvalid={!handleIngredient}
                  required
                />

                <Form.Control
                  type="text"
                  placeholder="množství ingredience"
                  value={ingredient.amount}
                  onChange={(event) => handleAmountChange(event, index)}
                  required
                />
                <Form.Control
                  type="text"
                  placeholder="jednotka"
                  defaultValue={mer[index] ? mer[index] : ""}
                  onChange={(event) => handleMeasurementChange(event, index)}
                  required
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
          <Form.Label>
            <span className={image ? "text-success" : "text-danger"}>*</span>
            Obrázek
          </Form.Label>
          <Form.Control type="file" onChange={handleImageChange} required />
        </Form.Group>
        <Form.Group controlId="recipePrepTime">
          <Form.Label>
            <span
              className={isPrepLengthValid ? "text-success" : "text-danger"}
            >
              *
            </span>
            Doba přípravy
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Napište dobu přípravy receptu v minutách"
            min="1"
            onChange={setPrepLengthChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="portionCount">
          <Form.Label>
            <span className={isPortionsValid ? "text-success" : "text-danger"}>
              *
            </span>
            Počet porcí
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Napište čísticí počet porcí"
            min="1"
            onChange={setPortionChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <span
              className={
                multiSelections.length > 0 ? "text-success" : "text-danger"
              }
            >
              *
            </span>
            Kategorie
          </Form.Label>
          <Typeahead
            id="basic-typeahead-multiple"
            labelKey="name"
            multiple
            onChange={setMultiSelections}
            options={cat}
            placeholder="Vyberte ze seznamu kategorie..."
            selected={multiSelections}
          />
        </Form.Group>
        <Button
          variant="primary"
          className="mt-2"
          type="submit"
          style={{ color: "#FFFFFF" }}
        >
          Vytvořit recept
        </Button>
      </Form>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recept byl vytvořen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Gratulujeme, recept byl úspěšně vytvořen!</p>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/">
            <Button style={{ color: "#FFFFFF" }}>Domů</Button>
          </Link>
          {newData && (
            <Link to={`/recept/${newData.id}`}>
              <Button variant="secondary" style={{ color: "#FFFFFF" }}>
                Recept
              </Button>
            </Link>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddRecipeForm;
