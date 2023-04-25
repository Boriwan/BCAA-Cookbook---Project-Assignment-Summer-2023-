import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CategoryView from "./CategoryView";
import DataStateResolver from "../../components/common/DataStateResolver";

const Category = () => {
  let { id } = useParams();
  const [callGetCategory, setCallGetCategory] = useState({ state: "pending" });

  useEffect(() => {
    fetch(`/category/get/${id}`).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setCallGetCategory({ state: "error", error: responseJson });
      } else {
        setCallGetCategory({ state: "ready", data: responseJson });
      }
    });
  }, [id]);

  return (
    <DataStateResolver data={callGetCategory}>
      <CategoryView data={callGetCategory.data} />
    </DataStateResolver>
  );
};

export default Category;
