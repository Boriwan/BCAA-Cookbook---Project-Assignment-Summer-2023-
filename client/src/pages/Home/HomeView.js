import React from "react";
import HeroSection from "./HeroSection";
import RecipeList from "../../components/RecipeList/RecipesByCategory";
import BestRecipes from "../../components/RecipeList/BestRecipes";

const HomeView = (props) => {
  return (
    <>
      <HeroSection topRecipes={props.topRecipes} />
      <BestRecipes topRecipes={props.topRecipes} />
      <RecipeList recipeList={props.recipeList} />

      {/* <AllRecipes recipeList={props.recipeList} /> */}
    </>
  );
};

export default HomeView;
