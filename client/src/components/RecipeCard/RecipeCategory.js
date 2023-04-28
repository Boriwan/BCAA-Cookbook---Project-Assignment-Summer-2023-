import Card from "./Card";
import React, { useState, useEffect } from "react";
import DataStateResolver from "../../components/common/DataStateResolver";
import RecipeCategoryView from "./RecipeCategoryView";

const RecipeCard = ({ category, title, description }) => {
  const [callGetRecipe, setCallGetRecipe] = useState({ state: "pending" });

  useEffect(() => {
    fetch(`recipe/filterRecipes/${category}`).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setCallGetRecipe({ state: "error", error: responseJson });
      } else {
        setCallGetRecipe({ state: "ready", data: responseJson });
      }
    });
  }, [category]);

  return (
    <>
      <DataStateResolver data={callGetRecipe}>
        <RecipeCategoryView
          recipeList={callGetRecipe}
          title={title}
          description={description}
        />
      </DataStateResolver>
    </>
  );
};

export default RecipeCard;
