import Card from "../../components/RecipeCard/Card";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const AllRecipes = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (event) => {
    const selectedCategory = event.currentTarget.getAttribute("value");

    if (selectedCategory === "Všechny recepty") {
      setSelectedCategory("");
    } else {
      setSelectedCategory(selectedCategory);
    }
  };

  const newData = selectedCategory
    ? props.data.filter(
        (recipe) =>
          recipe.categories && recipe.categories.includes(selectedCategory)
      )
    : props.data;

  return (
    <main>
      <h2 style={{ paddingTop: "15px" }} className="max-width text-primary h1">
        Všechny recepty
      </h2>
      <div className=" max-width">
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {selectedCategory ? selectedCategory : "Vyberte kategorii"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {props.categories.map((category) => (
              <Dropdown.Item
                key={category.name}
                value={category.name}
                onClick={handleCategorySelect}
              >
                {category.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="d-flex flex-wrap">
          {newData.map((recipe) => {
            return (
              <Card
                desc={recipe.desc}
                img={recipe.img}
                name={recipe.name}
                id={recipe.id}
                prepLength={recipe.prepLength}
                key={recipe.id}
                ratingValue={recipe.ratingValue}
                ratingCount={recipe.ratingCount}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default AllRecipes;
