import React, { useEffect, useState } from "react";
import DataStateResolver from "../../components/common/DataStateResolver";
import HomeView from "./HomeView";

const Home = (props) => {
  const [topRecipes, setTopRecipes] = useState({ state: "pending" });

  useEffect(() => {
    fetch(`/recipe/getTopRecipes`).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setTopRecipes({ state: "error", error: responseJson });
      } else {
        setTopRecipes({ state: "ready", data: responseJson });
      }
    });
  }, []);

  return (
    <>
      <DataStateResolver data={topRecipes}>
        <HomeView recipeList={topRecipes.data} topRecipes={topRecipes.data} />
      </DataStateResolver>
    </>
  );
};

export default Home;
