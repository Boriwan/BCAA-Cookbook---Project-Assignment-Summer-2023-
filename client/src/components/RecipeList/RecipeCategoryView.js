import React from "react";
import Card from "../RecipeCard/Card";

const RecipeCategoryView = ({ recipeList, description, title }) => {
  return (
    <section className="m-2" key={title}>
      <div className="title-box">
        <h2 className="text-primary">{title}</h2>
        <p>{description}</p>
      </div>
      <div className="d-flex flex-shrink-0" style={{ overflowX: "auto" }}>
        {recipeList.data.map((recipe) => {
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
    </section>
  );
};

export default RecipeCategoryView;
