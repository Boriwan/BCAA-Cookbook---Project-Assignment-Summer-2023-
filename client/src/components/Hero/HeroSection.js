import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

const HeroSection = ({ topRecipes }) => {
  const topFour = topRecipes.slice(0, 4);
  return (
    <div className="hero-section">
      <Carousel>
        {topFour.map((recipe, index) => {
          return (
            <Carousel.Item style={{ maxHeight: "60vh" }} key={recipe.id}>
              <img
                className="d-block w-100"
                src={`http://localhost:8000/recipe/image/${recipe.img}`}
                alt={recipe.name}
              />
              <Carousel.Caption
                style={{ backgroundColor: "rgb(255 255 255 / 83%)" }}
                className="p-2"
              >
                <h3 className="text-dark fw-bold" style={{ fontSize: "3rem" }}>
                  {recipe.name}
                </h3>
                <p className="text-dark fw-bold fs-6">{recipe.desc}</p>
                <p className="text-dark fw-bold">
                  Doba přípravy: {recipe.prepLength} minut
                </p>
                <Link
                  to={`/recept/${recipe.id}`}
                  className="btn btn-secondary text-white"
                >
                  Otevřít recept
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HeroSection;
