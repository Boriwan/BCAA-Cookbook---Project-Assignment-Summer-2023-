import React, { useState } from "react";
import { Button } from "react-bootstrap";

// přidání člověka 125%
const Recipe = ({ data }) => {
  const [count, setCount] = useState(parseInt(data.finalAmount));
  const [ing, setIng] = useState(data.ingredients);

  const handleIncrement = () => {
    setCount(count + 1);
    ing.forEach((ing) => {
      console.log(
        (parseInt(ing.amount) / parseInt(data.finalAmount)) *
          (parseInt(data.finalAmount) + 1)
      );
    });
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };
  return (
    <div
      className="recipe-container mt-5 mx-auto p-2"
      style={{ maxWidth: "1200px" }}
    >
      <img
        src={`../img/${data.img}`}
        alt=""
        className="w-50 mx-auto rounded d-block "
        style={{ height: "40vh", objectFit: "cover" }}
      />
      <div>
        <h1>{data.name}</h1>
        <p>{data.desc}</p>
      </div>
      <div>
        <ul className="list-group">
          <li className="list-group-item">
            Délka přípravy: {data.prepLength} minut
          </li>
          <li className="list-group-item">Počet porcí: {count}</li>
        </ul>
        <div>
          <Button onClick={handleDecrement}>Odebrat porci</Button>
          <Button onClick={handleIncrement}>Přidat porci</Button>
        </div>
      </div>
      <div className="d-flex justify-content-between display-block mt-5">
        <section className="postup">
          <ol
            style={{ fontSize: "30px" }}
            className="list-group list-group-numbered"
          >
            {data.method.map((desc) => {
              return (
                <li className="list-group-item d-flex" key={desc}>
                  <label className="form-check-label px-2" for={desc}>
                    <span style={{ fontSize: "18px" }}>{desc}</span>
                  </label>
                  <input
                    className="form-check-input me-1 ms-auto"
                    type="checkbox"
                    value=""
                    id={desc}
                  />
                </li>
              );
            })}
          </ol>
        </section>
        <section className="ingredients ms-2">
          <h2>Suroviny</h2>
          <ul className="list-group">
            {data.ingredients.map((data) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={data.name}
                >
                  <label className="form-check-label" for={data.name}>
                    {data.name}
                    <span className="ps-2">
                      {data.amount} {data.measurement}
                    </span>
                  </label>
                  <input
                    className="form-check-input me-1"
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

export default Recipe;
