import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import recipe from "../interfaces/recipe";
import Comments from "../components/Comments";

const SignleRecipe = () => {
  const [recipe, setRecipe] = useState<recipe | undefined>(undefined);
  const { id } = useParams();
  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/recipes/${id}`
        );
        console.log("Success", response.data);
        setRecipe(response.data);
      } catch (error) {
        console.log("Error", (error as AxiosError).message);
        setRecipe(undefined);
      }
    };

    getRecipe();
  }, [id]);

  return (
    <div className="mx-2 my-16">
      <div className=" container mx-auto max-w-6xl bg-white px-6 py-4 rounded-xl dark:bg-gray-500 dark:text-white">
        <div>
          <h2 className="text-2xl md:text-4xl text-pink-300 text-center">
            {recipe?.title}
          </h2>
          <p className="text-center text-sm text-gray-400 italic">
            created by: {recipe?.createdBy.username}
          </p>
        </div>
        <div className="my-6">
          <img
            className="rounded-xl mx-auto w-[350px] h-[350px]"
            src={recipe?.image.url}
            alt="food"
          />
        </div>
        <div className="flex  flex-col items-center justify-between text-gray-500 space-y-6 md:space-y-0 md:flex-row dark:text-white">
          <div className="md:w-1/2 px-6 py-4">
            <h4 className="text-pink-300 text-xl font-semibold text-center">
              Składniki:
            </h4>
            <ul className="list-disc text-center list-inside">
              {recipe?.ingredients.map((ingredient) => (
                <li>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 text-center px-6 py-4">
            <h4 className="text-pink-300 text-xl font-semibold">
              Sposób przygotowania:
            </h4>
            <p className="">{recipe?.method}</p>
          </div>
        </div>
      </div>
      <Comments comments={recipe?.comments} />
    </div>
  );
};

export default SignleRecipe;
