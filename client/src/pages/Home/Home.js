import React from "react";
import HeroSection from "../../components/Hero/HeroSection";
import RecipeList from "../../components/RecipeList/RecipeList";
import AllRecipes from "../../components/RecipeList/AllRecipes";

const Home = (props) => {
  return (
    <>
      <HeroSection recipeList={props.recipeList} />
      <AllRecipes recipeList={props.recipeList} />
      <RecipeList recipeList={props.recipeList} />
    </>
  );
};

export default Home;
