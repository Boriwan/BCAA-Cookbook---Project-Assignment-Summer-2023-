import React from "react";

const IngredientCard = ({ name, measurement, id }) => {
  return (
    <li
      className="list-group-item container d-flex justify-content-between"
      key={id}
    >
      <div className="row justify-content-between" style={{ width: "500px" }}>
        <span className="col-4">{name} </span>
        <span className="col">
          <b className="me-2">Jednotka:</b>
          {measurement}
        </span>
      </div>
      <div>
        <button className="btn btn-primary me-2">Vymazat ingredienci</button>
        <button className="btn btn-secondary">Spravovat ingredienci</button>
      </div>
    </li>
  );
};

export default IngredientCard;
