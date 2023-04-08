import React, { useContext } from "react";
import { RecipesContext } from "../context/RecipesContext";
import recipe from "../interfaces/recipe";
import RecipeItem from "./RecipeItem";

interface RecipeListProps {
  data: recipe[] | undefined;
}

const RecipesList = ({ data }: RecipeListProps) => {
  const { state } = useContext(RecipesContext);

  const filteredData = data?.filter((recipe) => {
    return state.searchTerm
      ? recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      : data;
  });

  return (
    <div className="container mx-auto w-full my-16 flex flex-col items-center justify-between space-y-8 min-h-screen md:space-y-0 md:flex-row md:flex-wrap md:items-start md:max-w-6xl md:gap-6">
      {filteredData &&
        filteredData.length > 0 &&
        filteredData.map((recipe: recipe) => {
          return <RecipeItem key={recipe._id} data={recipe} />;
        })}
    </div>
  );
};

export default RecipesList;
