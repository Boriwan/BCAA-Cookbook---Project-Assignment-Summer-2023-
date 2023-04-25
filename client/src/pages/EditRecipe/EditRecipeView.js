import React from "react";
import Form from "./Form";
const EditRecipeView = ({ data }) => {
  return (
    <>
      <h1>Upravit recept na {data.name} </h1>
      <Form data={data} />
    </>
  );
};

export default EditRecipeView;
