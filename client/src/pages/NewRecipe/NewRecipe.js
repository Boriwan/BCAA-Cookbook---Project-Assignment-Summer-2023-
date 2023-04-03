import React from "react";
import Form from "./Form";

const NewRecipe = (props) => {
  return (
    <main>
      <h1 className="max-width m-2 text-primary">Přidat recept</h1>
      <Form ingredientsData={props.ingredients} />
    </main>
  );
};

export default NewRecipe;
