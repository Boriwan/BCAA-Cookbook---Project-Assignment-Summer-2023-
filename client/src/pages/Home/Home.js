import React from "react";
import HeroSection from "../../components/Hero/HeroSection";
import RecipeList from "../../components/RecipeList/RecipeList";

const Home = (props) => {
  return (
    <>
      <HeroSection recipeList={props.recipeList} />
      <RecipeList recipeList={props.recipeList} />
    </>
  );
};

export default Home;
