import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";

const RecipeList = (props) => {
  return (
    <section className="max-width">
      <RecipeCard
        category="spagety"
        title="Špagety"
        description="Toto jsou ty nejlepší recepty, co mají špagety"
        data={props.recipeList}
      />
      <RecipeCard
        category="pasta"
        title="Těstoviny"
        description="Toto jsou ty nejlepší recepty, co obsahují těstoviny"
        data={props.recipeList}
      />
      <RecipeCard
        category="lasagne"
        title="Lasagne"
        description="Toto jsou ty nejlepší recepty, co jsou lasagne"
        data={props.recipeList}
      />
    </section>
  );
};

export default RecipeList;
