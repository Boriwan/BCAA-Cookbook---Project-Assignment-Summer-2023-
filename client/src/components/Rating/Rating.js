import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ id, ratingValue, ratingCount, ratingDisabled }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  let ratingAmount = 0;
  ratingValue.map((rating) => (ratingAmount += rating));
  const avgRating = ratingAmount / ratingCount;

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
              disabled={ratingDisabled} // disable radio input when ratingDisabled is true
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
              onMouseEnter={() => !ratingDisabled && setHover(starValue)} // only set hover if rating is not disabled
              onMouseLeave={() => !ratingDisabled && setHover(null)} // only clear hover if rating is not disabled
            />
          </label>
        );
      })}
      {!ratingDisabled && (
        <div>
          {avgRating && (
            <div>
              Průměrné: {avgRating.toFixed(1)} ze {ratingCount} lidí
            </div>
          )}
          {!avgRating && <div>Buď první, kdo ohodnotí recept!</div>}
        </div>
      )}
    </div>
  );
};

export default StarRating;
