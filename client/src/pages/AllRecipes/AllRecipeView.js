import Card from "../../components/RecipeCard/Card";
import React, { useState } from "react";
import { Dropdown, Pagination } from "react-bootstrap";

const RECIPES_PER_PAGE = 10;

const AllRecipes = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategorySelect = (event) => {
    const selectedCategory = event.currentTarget.getAttribute("value");

    if (selectedCategory === "Všechny recepty") {
      setSelectedCategory("");
    } else {
      setSelectedCategory(selectedCategory);
    }

    setCurrentPage(1);
  };

  const filteredData = selectedCategory
    ? props.data.filter(
        (recipe) =>
          recipe.categories && recipe.categories.includes(selectedCategory)
      )
    : props.data;

  const totalPages = Math.ceil(filteredData.length / RECIPES_PER_PAGE);
  const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
  const endIndex = startIndex + RECIPES_PER_PAGE;
  const currentRecipes = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main>
      <h2 style={{ paddingTop: "15px" }} className="max-width text-primary h1">
        Všechny recepty
      </h2>
      <div className=" max-width">
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic"
            style={{ color: "#FFFFFF" }}
          >
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
          {currentRecipes.map((recipe) => {
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
        <Pagination className="mt-3">
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </main>
  );
};

export default AllRecipes;
