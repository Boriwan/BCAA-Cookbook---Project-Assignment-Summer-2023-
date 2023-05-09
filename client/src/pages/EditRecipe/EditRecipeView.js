import React from "react";
import Form from "./Form";
const EditRecipeView = ({ data }) => {
  return (
    <>
      <h1>Upravit recept "{data.name}" </h1>
      <Form data={data} />
    </>
  );
};

export default EditRecipeView;
