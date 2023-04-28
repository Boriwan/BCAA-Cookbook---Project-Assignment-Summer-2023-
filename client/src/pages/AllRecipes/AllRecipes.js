import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AllRecipeView from "./AllRecipeView";
import DataStateResolver from "../../components/common/DataStateResolver";

const Recipe = () => {
  let { id } = useParams();
  const [callGetRecipe, setCallGetRecipe] = useState({ state: "pending" });
  const [callGetCategories, setCallGetCategories] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch(`recipes`).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setCallGetRecipe({ state: "error", error: responseJson });
      } else {
        setCallGetRecipe({ state: "ready", data: responseJson });
      }
    });
  }, [id]);
  useEffect(() => {
    fetch(`categories`).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setCallGetCategories({ state: "error", error: responseJson });
      } else {
        setCallGetCategories({ state: "ready", data: responseJson });
      }
    });
  }, [id]);

  return (
    <DataStateResolver data={callGetRecipe} categories={callGetCategories.data}>
      <AllRecipeView
        data={callGetRecipe.data}
        categories={callGetCategories.data}
      />
    </DataStateResolver>
  );
};

export default Recipe;
