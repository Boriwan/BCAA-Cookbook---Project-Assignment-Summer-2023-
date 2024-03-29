import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRating from "../../components/Rating/Rating";

const RecipeView = ({ data }) => {
  const [count, setCount] = useState(parseInt(data.finalAmount));
  const [ing, setIng] = useState(data.ingredients);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    fetch(`/recipe/delete/${data.id}`, {
      method: "delete",
    });
  };

  const handleIncrement = () => {
    setCount(count + 1);
    const updatedIngredients = ing.map((ingredient) => {
      const currentAmount = parseInt(ingredient.amount);
      if (Number.isNaN(currentAmount)) {
        return ingredient;
      }
      const newAmount = Math.ceil((currentAmount / count) * (count + 1));
      return { ...ingredient, amount: newAmount.toString() };
    });
    setIng(updatedIngredients);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      const updatedIngredients = ing.map((ingredient) => {
        const currentAmount = parseInt(ingredient.amount);
        if (Number.isNaN(currentAmount)) {
          return ingredient;
        }
        const newAmount = Math.ceil((currentAmount / count) * (count - 1));
        return { ...ingredient, amount: newAmount.toString() };
      });
      setIng(updatedIngredients);
    }
  };
  data.ingredients = ing;
  const categoriList = data.categories;

  return (
    <div className="recipe-container mt-2 max-width p-2" key={data.id}>
      <div className="m-2 d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-primary m-2 text-white"
          onClick={() => setShowModal(true)}
        >
          Odstranit recept
        </button>
        <Link to={`/upravit-recept/${data.id}`}>
          <button type="button" className="btn btn-secondary m-2 text-white">
            Upravit recept
          </button>
        </Link>
      </div>
      <img
        src={`http://localhost:8000/recipe/image/${data.img}`}
        alt={data.name}
        className="w-50 mx-auto rounded d-block "
        style={{ height: "40vh", objectFit: "cover", objectPosition: "bottom" }}
      />
      <div>
        <h1>{data.name}</h1>
        <div className="d-flex align-items-center mb-2">
          <p className="m-0">{data.desc}</p>{" "}
          {categoriList && categoriList.length > 0 && (
            <div className="btn btn-outline-primary ms-2">{categoriList}</div>
          )}
        </div>
      </div>
      <div>
        <ul className="list-group">
          <li className="list-group-item">
            Délka přípravy: {data.prepLength} minut
          </li>
          <li className="list-group-item">Počet porcí: {count}</li>
        </ul>
        <div>
          <Button
            onClick={handleDecrement}
            className="btn-primary m-2 text-white"
          >
            Odebrat porci
          </Button>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Authorization Required</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Opravdu chcete odstranit recept?</p>
              {/* form inputs to enter authorization info */}
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary text-white"
                onClick={() => setShowModal(false)}
              >
                Zpět
              </Button>
              <Link to="/">
                <Button variant="danger" onClick={handleDelete}>
                  Odstranit recept
                </Button>
              </Link>
            </Modal.Footer>
          </Modal>
          <Button
            onClick={handleIncrement}
            className="btn-secondary m-2 text-white"
          >
            Přidat porci
          </Button>
        </div>
      </div>
      <div className="mt-2">
        <h2>Ohodnoťte recpet:</h2>
        <StarRating
          id={data.id}
          ratingValue={data.ratingValue}
          ratingCount={data.ratingCount}
        />
      </div>
      <div className="d-flex justify-content-between display-block mt-2">
        <section className="postup">
          <h2>Postup přípravy:</h2>
          <ol
            style={{ fontSize: "30px" }}
            className="list-group list-group-numbered"
          >
            {data.method.map((desc) => {
              return (
                <li className="list-group-item d-flex" key={desc}>
                  <label className="form-check-label px-2" htmlFor={desc}>
                    <span style={{ fontSize: "18px" }}>{desc}</span>
                  </label>
                  <input
                    className="form-check-input me-1 ms-auto "
                    type="checkbox"
                    value=""
                    id={desc}
                    style={{ minWidth: "1em" }}
                  />
                </li>
              );
            })}
          </ol>
        </section>
        <section className="ingredients ms-2">
          <h2>Ingredience:</h2>
          <ul className="list-group" style={{ width: "250px" }}>
            {data.ingredients.map((data) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={data.name}
                >
                  <label className="form-check-label" htmlFor={data.name}>
                    <b>{data.name}:</b>
                    <span className="ps-2">
                      {data.amount} {data.measurement}
                    </span>
                  </label>
                  <input
                    className="form-check-input me-1 ms-1"
                    type="checkbox"
                    value=""
                    id={data.name}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default RecipeView;
