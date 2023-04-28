import React, { useEffect, useState } from "react";
import DataStateResolver from "../../components/common/DataStateResolver";
import IngredientsView from "./IngredientsView";

const Ingredients = () => {
  const [callListIngredients, setCallListIngredients] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch(`/ingredients`).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setCallListIngredients({ state: "error", error: responseJson });
      } else {
        setCallListIngredients({ state: "ready", data: responseJson });
      }
    });
  }, []);

  return (
    <>
      <DataStateResolver data={callListIngredients}>
        <IngredientsView ingredientsList={callListIngredients.data} />
      </DataStateResolver>
    </>
  );
};

export default Ingredients;
