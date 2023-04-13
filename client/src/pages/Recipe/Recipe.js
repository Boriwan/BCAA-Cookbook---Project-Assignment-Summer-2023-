import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeView from "./RecipeView";
import DataStateResolver from "../../components/common/DataStateResolver";

const Recipe = () => {
  let { id } = useParams();
  const [callGetRecipe, setCallGetRecipe] = useState({ state: "pending" });

  useEffect(() => {
    fetch(`/recipe/get/${id}`).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setCallGetRecipe({ state: "error", error: responseJson });
      } else {
        setCallGetRecipe({ state: "ready", data: responseJson });
      }
    });
  }, [id]);

  return (
    <DataStateResolver data={callGetRecipe}>
      <RecipeView data={callGetRecipe.data} />
    </DataStateResolver>
  );
};

export default Recipe;
