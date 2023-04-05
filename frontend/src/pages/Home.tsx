import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import recipe from "../interfaces/recipe";
import RecipeItem from "../components/RecipeItem";
import { Link } from "react-router-dom";
import plus from "../assets/plus.png";

const Home = () => {
  const [recipes, setRecipes] = useState<recipe[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const getRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/recipes", {
          signal: controller.signal,
        });
        console.log(res.data);
        setRecipes(res.data);
      } catch (err) {
        console.log((err as AxiosError).response?.data);
      }
    };

    getRecipes();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="mx-2">
      <div className="container mx-auto w-full my-16 flex flex-col items-center justify-between space-y-8 md:space-y-0 md:flex-row md:flex-wrap md:max-w-6xl md:gap-6">
        {recipes.length > 0 &&
          recipes.map((recipe: recipe) => {
            return <RecipeItem key={recipe._id} data={recipe} />;
          })}
      </div>
      <Link
        className="items-center justify-center w-14 h-14 rounded-full bg-white fixed bottom-10 right-10 group hidden md:flex"
        to="/create"
      >
        <img
          src={plus.toString()}
          alt="add sign"
          className="invert-[50%] group-hover:invert-0"
        />
      </Link>
    </div>
  );
};

export default Home;
