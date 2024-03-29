import { React } from "react";
import { BsClock } from "react-icons/bs";
import { Link } from "react-router-dom";
import StarRating from "../Rating/Rating";

const Card = ({
  desc,
  img,
  name,
  id,
  prepLength,
  ratingValue,
  ratingCount,
  starDisabled,
}) => {
  return (
    <div
      className="card m-2 "
      style={{ minWidth: "14rem", maxWidth: "14rem" }}
      key={id}
    >
      <img
        src={`http://localhost:8000/recipe/image/${img}`}
        className="card-img-top"
        style={{ height: "12rem", objectFit: "cover" }}
        alt={name}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{desc}</p>
        {!starDisabled && (
          <StarRating
            id={id}
            ratingValue={ratingValue}
            ratingCount={ratingCount}
            ratingDisabled={true}
          />
        )}
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <BsClock className="mx-1" /> {prepLength} minut
          </div>

          <Link className="btn btn-secondary text-white" to={`/recept/${id}`}>
            Otevřít
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
