import React from "react";
import RecipeCategory from "./RecipeCategory";

const RecipeList = (props) => {
  return (
    <section className="max-width" style={{ paddingTop: "20px" }}>
      <RecipeCategory
        category="Špagety"
        title="Špagety"
        description="Toto jsou ty nejlepší recepty, co obsahují špagety"
      />
      <RecipeCategory
        category="Lasagne"
        title="Lasagne"
        description="Toto jsou ty nejlepší recepty, co jsou lasagne"
      />
    </section>
  );
};

export default RecipeList;
