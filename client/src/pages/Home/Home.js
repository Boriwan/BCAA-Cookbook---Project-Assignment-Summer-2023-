import React, { useEffect, useState } from "react";
import DataStateResolver from "../../components/common/DataStateResolver";
import HomeView from "./HomeView";

const Home = (props) => {
  const [callListRecipes, setCallListRecipes] = useState({ state: "pending" });

  useEffect(() => {
    console.log("fetch");
    fetch(`/recipes`).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setCallListRecipes({ state: "error", error: responseJson });
      } else {
        setCallListRecipes({ state: "ready", data: responseJson });
      }
    });
  }, []);

  console.log("Render home");

  return (
    <>
      <DataStateResolver data={callListRecipes}>
        <HomeView recipeList={callListRecipes.data} />
      </DataStateResolver>
    </>
  );
};

export default Home;
