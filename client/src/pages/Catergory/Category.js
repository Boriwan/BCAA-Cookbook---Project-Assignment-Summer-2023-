import React, { useState, useEffect } from "react";
import CategoryView from "./CategoryView";
import DataStateResolver from "../../components/common/DataStateResolver";

const Category = () => {
  const [callGetCategory, setCallGetCategory] = useState({ state: "pending" });

  useEffect(() => {
    fetch(`/categories`).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setCallGetCategory({ state: "error", error: responseJson });
      } else {
        setCallGetCategory({ state: "ready", data: responseJson });
      }
    });
  }, []);

  return (
    <DataStateResolver data={callGetCategory}>
      <CategoryView data={callGetCategory.data} />
    </DataStateResolver>
  );
};

export default Category;
