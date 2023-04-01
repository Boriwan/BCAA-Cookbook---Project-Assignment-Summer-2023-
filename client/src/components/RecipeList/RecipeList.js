import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";

const RecipeList = () => {
  return (
    <section>
      <RecipeCard
        category="spagety"
        title="Špagety"
        description="Toto jsou ty nejlepší recepty, co mají špagety"
      />
      <RecipeCard
        category="pasta"
        title="Těstoviny"
        description="Toto jsou ty nejlepší recepty, co obsahují těstoviny"
      />
    </section>
  );
};

export default RecipeList;
