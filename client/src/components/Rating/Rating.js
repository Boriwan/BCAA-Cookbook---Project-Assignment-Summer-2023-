import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const StarRating = ({ id }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
    console.log(`You rated this ${index + 1} stars`);
    console.log(rating);
    fetch(`/recipe/addRating/${id}`, {
      method: "PUT",
      rating: index + 1,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="d-flex">
      {[...Array(5)].map((_, index) => {
        return (
          <FaStar
            key={index}
            size={30}
            className={index < rating ? "text-warning" : "text-secondary"}
            onClick={() => handleStarClick(index)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
