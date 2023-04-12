import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";

const AddRecipeForm = ({ ingredientsData }) => {
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
  const [filteredIngredients, setFilteredIngredients] = useState([]);

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

    fetch("/recipe/createRecipe", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

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

  const handleIngredientChange = (event, index) => {
    const ingredientName = event.target.value.toLowerCase();
    const filteredIngredients = ingredientsData.filter((ingredient) =>
      ingredient.name.toLowerCase().startsWith(ingredientName)
    );
    setFilteredIngredients(filteredIngredients);
    const newIngredients = [...ingredients];
    newIngredients[index].name = event.target.value;
    setIngredients(newIngredients);
  };

  const handleAmountChange = (event, index) => {
    const newIngredients = [...ingredients];
    const selectedIngredient = newIngredients[index];
    selectedIngredient.amount = event.target.value;
    const matchingIngredient = ingredientsData.find(
      (ingredient) => ingredient.name === selectedIngredient.name
    );
    if (matchingIngredient) {
      selectedIngredient.measurement = matchingIngredient.measurement;
    }
    setIngredients(newIngredients);
  };

  const handleSelectIngredient = (selectedIngredient, index) => {
    const newIngredients = [...ingredients];
    const matchingIngredient = ingredientsData.find(
      (ingredient) => ingredient.name === selectedIngredient
    );
    if (matchingIngredient) {
      newIngredients[index].name = matchingIngredient.name;
      newIngredients[index].measurement = matchingIngredient.measurement;
    }
    setIngredients(newIngredients);
    setFilteredIngredients([]);
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
            <Button variant="danger" onClick={() => handleRemoveStep(index)}>
              X
            </Button>
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
              <Form.Control
                type="text"
                value={ingredient.name}
                onChange={(event) => handleIngredientChange(event, index)}
                placeholder="Napište ingredienci"
              />
              {filteredIngredients.length > 0 && (
                <select
                  className="form-select"
                  key={ingredient.id}
                  onChange={(e) =>
                    handleSelectIngredient(e.target.value, index)
                  }
                >
                  {filteredIngredients.map((ingredient) => (
                    <option key={ingredient.name}>{ingredient.name}</option>
                  ))}
                </select>
              )}
              <Form.Control
                type="number"
                placeholder="mnoství ingredience"
                value={ingredient.amount}
                onChange={(event) => handleAmountChange(event, index)}
              />
              <Form.Control
                type="text"
                placeholder="jednotka"
                value={ingredient.measurement}
                readOnly
              />

              <Button
                variant="danger"
                onClick={() => handleRemoveIngredient(index)}
              >
                X
              </Button>
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
        <Form.Control type="file" onChange={handleImageChange} />
      </Form.Group>
      <Form.Group controlId="recipePrepTime">
        <Form.Label>Doba přípravy</Form.Label>
        <Form.Control
          type="number"
          placeholder="Napište dobu přípravy receptu v minutách"
        />
      </Form.Group>
      <Form.Group controlId="portionCount">
        <Form.Label>Počet porcí</Form.Label>
        <Form.Control
          type="number"
          placeholder="Napište čístlicí počet porcí"
        />
      </Form.Group>
      <Button variant="primary" className="mt-2" type="submit">
        Odeslat recept
      </Button>
    </Form>
  );
};

export default AddRecipeForm;
