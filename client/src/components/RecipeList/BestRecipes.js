import React from "react";
import Card from "../RecipeCard/Card";
import { Link } from "react-router-dom";

const AllRecipes = ({ topRecipes }) => {
  return (
    <main className="max-width">
      <h2 style={{ paddingTop: "15px" }} className="max-width text-primary h1">
        Top 10 nejlépe ohodnocených receptů
      </h2>
      <div
        className="d-flex  max-width flex-shrink-0 flex-xl-wrap"
        style={{ overflowX: "auto" }}
      >
        {topRecipes.map((recipe) => {
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
      <Link to="/vsechny-recepty" className=" m-2">
        Zobrazit všechny recepty
      </Link>
    </main>
  );
};

export default AllRecipes;
