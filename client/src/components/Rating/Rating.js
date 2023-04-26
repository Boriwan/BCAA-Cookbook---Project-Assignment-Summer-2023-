import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ id, ratingValue, ratingCount }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  let ratingAmount = 0;
  ratingValue.map((rating) => (ratingAmount += rating));
  const avgRating = ratingAmount / ratingCount;
  console.log(avgRating);
  const handleClick = async (value) => {
    // Send rating value to backend
    const response = await fetch(`/recipe/addRating/${id}`, {
      method: "PUT",
      body: JSON.stringify({ value }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle response from backend
    if (response.ok) {
      // Rating successfully saved
    } else {
      // Error occurred while saving rating
    }
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={starValue}
              onClick={() => {
                setRating(starValue);
                handleClick(starValue);
              }}
              style={{ display: "none" }}
            />
            <FaStar
              size={24}
              color={
                (hover ?? rating) >= starValue
                  ? "#ffc102"
                  : avgRating >= starValue
                  ? "#ffc102"
                  : "#dee2e6"
              }
              style={{
                marginRight: "5px",
                border:
                  hover && starValue <= hover ? "1px solid #ffc102" : "none",
              }}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}

      {avgRating && (
        <div>
          Průměrné: {avgRating.toFixed(1)} ze {ratingCount} lidí
        </div>
      )}
      {!avgRating && <div>Buď první, kdo ohodnotí recept!</div>}
    </div>
  );
};

export default StarRating;
