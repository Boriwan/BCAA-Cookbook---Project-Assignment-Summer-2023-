import React from "react";
import RecipeCategory from "../RecipeCard/RecipeCategory";

const RecipeList = (props) => {
  return (
    <section className="max-width" style={{ paddingTop: "20px" }}>
      <RecipeCategory
        category="spagety"
        title="Špagety"
        description="Toto jsou ty nejlepší recepty, co obsahují špagety"
      />
      <RecipeCategory
        category="lasagne"
        title="Lasagne"
        description="Toto jsou ty nejlepší recepty, co jsou lasagne"
      />
      <RecipeCategory
        category="pasta"
        title="Jiné"
        description="Toto jsou ty nejlepší recepty, co obsahují těstoviny"
      />
    </section>
  );
};

export default RecipeList;
