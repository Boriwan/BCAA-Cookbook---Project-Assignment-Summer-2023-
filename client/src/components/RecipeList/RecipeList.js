import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";

const RecipeList = (props) => {
  return (
    <section className="max-width" style={{paddingTop: "20px"}}>
      <RecipeCard 
        category="spagety"
        title="Špagety"
        description="Toto jsou ty nejlepší recepty, co obsahují špagety"
        data={props.recipeList}
      />
      <RecipeCard
        category="lasagne"
        title="Lasagne"
        description="Toto jsou ty nejlepší recepty, co jsou lasagne"
        data={props.recipeList}
      />
      <RecipeCard
        category="pasta"
        title="Jiné"
        description="Toto jsou ty nejlepší recepty, co obsahují těstoviny"
        data={props.recipeList}
      />
      
    </section>
  );
};

export default RecipeList;
