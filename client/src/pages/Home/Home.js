import React from "react";
import RecipeList from "../../components/RecipeList/RecipeList";

const Home = (props) => {
  return <RecipeList recipeList={props.recipeList} />;
};

export default Home;
