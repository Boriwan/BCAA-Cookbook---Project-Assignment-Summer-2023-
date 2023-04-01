import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";

const RecipeList = () => {
  return (
    <section className="max-width">
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
      <RecipeCard
        category="lasagne"
        title="Lasagne"
        description="Toto jsou ty nejlepší recepty, co jsou lasagne"
      />
    </section>
  );
};

export default RecipeList;
