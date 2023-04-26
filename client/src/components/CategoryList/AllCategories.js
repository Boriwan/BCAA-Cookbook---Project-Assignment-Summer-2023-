import React from "react";
import Card from "../RecipeCard/Card";

const AllCategories = ({ categoryList }) => {
  return (
    <main>
      <h1 className="max-width text-primary h1">Všechny kategorie</h1>
      <div className="d-flex flex-wrap max-width">
        {categoryList.map((category) => {
          return (
            <Card
              name={category.name}
              desc={category.desc}
              id={category.id}
              key={category.id}
            />
          );
        })}
      </div>
    </main>
  );
};

export default AllCategories;
