import React from "react";
import Card from "../RecipeCard/Card";

const AllRecipes = ({ recipeList }) => {
  return (
    <main>
      <h2 className="max-width text-primary h1">Všechny recepty</h2>
      <div className="d-flex flex-wrap max-width">
        {recipeList.map((recipe) => {
          return (
            <Card
              desc={recipe.desc}
              img={recipe.img}
              name={recipe.name}
              id={recipe.id}
              prepLength={recipe.prepLength}
              key={recipe.id}
            />
          );
        })}
      </div>
    </main>
  );
};

export default AllRecipes;
