import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const AddRecipeForm = ({ data }) => {
  const [ingr, setIngr] = useState([]);
  const [cat, setCat] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
  const finalAmountRef = useRef();
  const prepLengthRef = useRef();
  const [image, setImage] = useState(null);
  const [img, setImg] = useState(data.img || null);

  const [method, setMethod] = useState(data.method || [""]);
  const [ingredients, setIngredients] = useState(
    data.ingredients || [{ name: "", amount: "", measurement: "" }]
  );

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const correctCategory = cat.filter((category) => {
    return category.name == data.categories;
  });

  useEffect(() => {
    if (data) {
      titleRef.current.value = data.name;
      descriptionRef.current.value = data.desc;
      finalAmountRef.current.value = data.finalAmount;
      prepLengthRef.current.value = data.prepLength;
    }
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (img) {
      formData.append("img", img);
    } else {
      formData.append("img", image);
    }
    formData.append("name", titleRef.current.value);
    formData.append("desc", descriptionRef.current.value);
    formData.append("method", JSON.stringify(method));
    formData.append("ingredients", JSON.stringify(ingredients));

    formData.append("prepLength", prepLengthRef.current.value);
    formData.append("finalAmount", finalAmountRef.current.value);
    formData.append("categories", JSON.stringify(data.categories));
    fetch(`/recipe/updateRecipe/${data.id}`, {
      method: "PUT",
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
          <Form.Control type="text" ref={titleRef} />
        </Form.Group>
        <Form.Group controlId="recipeDescription">
          <Form.Label>Popis receptu</Form.Label>
          <Form.Control type="text" maxLength="120" ref={descriptionRef} />
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
                  placeholder="Vyberte ingredienci..."
                  defaultInputValue={ingredient.name}
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
                  defaultValue={ingredient.measurement}
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
          {img && (
            <div className="input-group">
              <Form.Control type="text" defaultValue={data.img} readOnly />
              <Button variant="danger" onClick={() => setImg(null)}>
                X
              </Button>
            </div>
          )}

          {!img && <Form.Control type="file" onChange={handleImageChange} />}
        </Form.Group>
        <Form.Group controlId="recipePrepTime">
          <Form.Label>Doba přípravy</Form.Label>
          <Form.Control
            type="number"
            placeholder="Napište dobu přípravy receptu v minutách"
            min="1"
            ref={prepLengthRef}
          />
        </Form.Group>
        <Form.Group controlId="portionCount">
          <Form.Label>Počet porcí</Form.Label>
          <Form.Control
            type="number"
            placeholder="Napište čístlicí počet porcí"
            min="1"
            ref={finalAmountRef}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Kategorie</Form.Label>
          <Typeahead
            selected={correctCategory}
            id="basic-typeahead-multiple"
            labelKey="name"
            multiple
            onChange={setMultiSelections}
            options={cat}
            placeholder="Vyberte ze seznamu categorie..."
          />
        </Form.Group>
        <Button variant="primary" className="mt-2" type="submit">
          Odeslat recept
        </Button>
      </Form>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recep byl úspěšně upraven</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Gratulujeme, recept byl úspěšně upraven!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Domů
          </Button>
          <Button
            onClick={() => {
              window.location.href = `/recept/${data.id}`;
            }}
          >
            Recept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddRecipeForm;
