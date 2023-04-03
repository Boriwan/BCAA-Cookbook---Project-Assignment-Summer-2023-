import { React } from "react";
import { BsClock } from "react-icons/bs";
import { Link } from "react-router-dom";

const RecipeCard = (props) => {
  const recipeList = props.data.map((data) => data);
  const sortedByCategory = recipeList.filter((item) => {
    return item.categories === props.category;
  });

  return (
    <section className="m-2" key={props.title}>
      <div className="title-box">
        <h2 className="text-secondary">{props.title}</h2>
        <p>{props.description}</p>
      </div>
      <div className="d-flex flex-shrink-0" style={{ overflowX: "auto" }}>
        {sortedByCategory.map((recipe) => {
          return (
            <div
              className="card m-2 "
              style={{ minWidth: "14rem", maxWidth: "14rem" }}
              key={recipe.desc}
            >
              <img
                src={`img/${recipe.img}`}
                className="card-img-top"
                style={{ height: "12rem", objectFit: "cover" }}
                alt={recipe.name}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.desc}</p>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <BsClock className="mx-1" /> {recipe.prepLength} minut
                  </div>
                  <Link
                    className="btn btn-secondary text-white"
                    to={`/recept/${recipe.id}`}
                  >
                    Otevřít
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecipeCard;
