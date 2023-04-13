import { useNavigate } from "react-router-dom";
import recipe from "../interfaces/recipe";
import deleteIcon from "../assets/delete.svg";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { RecipesContext } from "../context/RecipesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ReactStars from "react-stars";

interface RecipeItemProps {
  data: recipe;
}

const RecipeItem = ({ data }: RecipeItemProps) => {
  const { state: AuthState } = useAuthContext();
  const navigate = useNavigate();
  const { dispatch } = useContext(RecipesContext);

  function calculateAverageRating(data: recipe): number {
    const { comments } = data;
    if (comments.length === 0) {
      return 0;
    }
    const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
    const average = sum / comments.length;
    return average;
  }

  const deleteHandler = async (e: React.MouseEvent) => {
    if (!AuthState.user) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:4000/api/recipes/${data._id}`,
        {
          headers: {
            Authorization: `Bearer ${AuthState.user?.token}`,
          },
        }
      );
      console.log("Success", response.data);
      dispatch({ type: "DELETE_RECIPE", payload: { recipe: response.data } });
    } catch (error) {
      console.log((error as AxiosError).message);
    }
  };

  const clickHandler = (e: React.MouseEvent) => {
    navigate(`/${data._id}`);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow px-6 py-3 pb-10 space-y-4 transition duration-150 hover:-translate-y-1 w-[75%] md:w-[330px] h-[450px] dark:bg-gray-500 dark:text-white">
      <div className="h-1/2 w-4/5 mx-auto md:w-full">
        <img
          src={data.image.url}
          alt="food"
          className="h-full w-full rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center justify-between h-1/2 space-y-3">
        <div>
          <h3 className="text-lg text-pink-300 text-center font-semibold tracking-wider">
            {data.title.substring(0, 60)}
          </h3>
          <p className="text-xs text-gray-300">
            created by: {data.createdBy.username}
          </p>
        </div>
        <p className="text-sm leading-2 text-gray-500 text-center dark:text-white">
          {data.method.substring(0, 80)}...
        </p>
        <p className="text-xs tracking-wider text-gray-400 text-center dark:text-gray-100">
          {data.cookingTime} minutes to prepare
        </p>
        <div className="text-center">
          <button
            onClick={clickHandler}
            className="px-8 py-2 rounded-full bg-[#fc8bd8] font-semibold text-sm text-white hover:bg-[#ff74dc] hover:text-white  "
          >
            Cook this
          </button>
        </div>
      </div>
      {data.createdBy.user_id === AuthState.user?.user_id && (
        <div>
          <img
            onClick={deleteHandler}
            className="hidden absolute invert-[60%] bottom-1 right-2 w-6 transition-all group-hover:inline-block hover:invert-0 hover:cursor-pointer dark:invert-[70%] dark:hover:invert-[100%]"
            src={deleteIcon.toString()}
            alt=""
          />
        </div>
      )}
      <div className="flex items-center justify-center absolute bottom-1 left-2">
        <span className="text-gray-700 dark:text-gray-200">
          {calculateAverageRating(data).toFixed(1)}/5
        </span>
        <span>
          <ReactStars
            value={1}
            count={1}
            size={26}
            color2={"#ffd700"}
            edit={false}
          />
        </span>
      </div>
    </div>
  );
};

export default RecipeItem;
