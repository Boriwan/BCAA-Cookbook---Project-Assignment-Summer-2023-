import Card from "./Card";

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
            <Card
              desc={recipe.desc}
              img={recipe.img}
              name={recipe.name}
              id={recipe.id}
              prepLength={recipe.prepLength}
              key={recipe.id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default RecipeCard;
