import React from "react";
import Form from "./Form";

const NewRecipe = (props) => {
  return (
    <main>
      <h1 style={{paddingTop: "25px", width: "100%", justifyContent: "center", alignItems: "center", display: "flex"}} className="m-2 text-primary">Přidat recept</h1>
      
        <Form ingredientsData={props.ingredients} />
      
    </main>
  );
};

export default NewRecipe;
