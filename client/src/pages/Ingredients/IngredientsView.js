import React from "react";
import CategoryCard from "./IngredientCard";
const IngredientsView = ({ ingredientsList }) => {
  console.log(ingredientsList);
  return (
    <main>
      <h1 className="max-width text-primary h1">Všechny Ingredience</h1>
      <div className="max-width">
        <div className="card m-5">
          <ul className="list-group list-group-flush">
            {ingredientsList.map((category) => {
              return (
                <CategoryCard
                  name={category.name}
                  measurement={category.measurement}
                  id={category.id}
                  key={category.id}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default IngredientsView;
