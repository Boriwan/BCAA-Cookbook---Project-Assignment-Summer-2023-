import React from "react";
import RecipeCategory from "../RecipeCard/RecipeCategory";

const RecipeList = (props) => {
  return (
    <section className="max-width" style={{ paddingTop: "20px" }}>
      <RecipeCategory
        category="spagety"
        title="Špagety"
        description="Toto jsou ty nejlepší recepty, co obsahují špagety"
        data={props.recipeList}
      />
      <RecipeCategory
        category="lasagne"
        title="Lasagne"
        description="Toto jsou ty nejlepší recepty, co jsou lasagne"
        data={props.recipeList}
      />
      <RecipeCategory
        category="pasta"
        title="Jiné"
        description="Toto jsou ty nejlepší recepty, co obsahují těstoviny"
        data={props.recipeList}
      />
    </section>
  );
};

export default RecipeList;
