import { useNavigate } from "react-router-dom";
import recipe from "../interfaces/recipe";
import deleteIcon from "../assets/delete.svg";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { RecipesContext } from "../context/RecipesContext";

interface RecipeItemProps {
  data: recipe;
}

const RecipeItem = ({ data }: RecipeItemProps) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(RecipesContext);

  const deleteHandler = async (e: React.MouseEvent) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/recipes/${data._id}`
      );
      console.log("Success", response.data);
      dispatch({ type: "DELETE_RECIPE", payload: { recipe: data } });
    } catch (error) {
      console.log((error as AxiosError).message);
    }
  };

  const clickHandler = (e: React.MouseEvent) => {
    navigate(`/${data._id}`);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow px-6 py-3 pb-10 space-y-4 transition duration-150 hover:-translate-y-1 w-[75%] md:w-[330px] h-[450px]">
      <div className="h-1/2 w-4/5 mx-auto md:w-full">
        <img
          src={data.image.url}
          alt="food"
          className="h-full w-full rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center justify-between h-1/2 space-y-3">
        <h3 className="text-lg text-pink-300 text-center font-semibold tracking-wider text-gray-800">
          {data.title.substring(0, 60)}
        </h3>
        <p className="text-sm leading-2 text-gray-500 text-center">
          {data.method.substring(0, 80)}...
        </p>
        <p className="text-xs text-gray-400 text-center">
          {data.cookingTime} minutes to prepare
        </p>
        <div className="text-center">
          <button
            onClick={clickHandler}
            className="px-8 py-2 rounded-full bg-gray-400 font-semibold text-sm text-white hover:bg-slate-400 hover:text-white"
          >
            Cook this
          </button>
        </div>
      </div>
      <div>
        <img
          onClick={deleteHandler}
          className="hidden absolute invert-[60%] bottom-1 right-2 w-6 transition-all group-hover:inline-block hover:invert-0 hover:cursor-pointer"
          src={deleteIcon.toString()}
          alt=""
        />
      </div>
    </div>
  );
};

export default RecipeItem;
