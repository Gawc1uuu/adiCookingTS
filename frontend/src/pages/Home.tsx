import { useEffect, useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import recipe from "../interfaces/recipe";
import RecipeItem from "../components/RecipeItem";
import { Link } from "react-router-dom";
import plus from "../assets/plus.png";
import { RecipesContext } from "../context/RecipesContext";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const { state, dispatch } = useContext(RecipesContext);

  useEffect(() => {
    const controller = new AbortController();

    const getRecipes = async (page: number) => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/recipes?page=${page}&limit=6`,
          {
            signal: controller.signal,
          }
        );
        console.log(res.data);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
        dispatch({
          type: "SET_RECIPES",
          payload: { recipes: res.data.recipes },
        });
      } catch (err) {
        console.log((err as AxiosError).response?.data);
      }
    };

    getRecipes(currentPage);

    return () => {
      controller.abort();
    };
  }, [dispatch, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  console.log(totalPages);
  console.log(currentPage);

  return (
    <div className="mx-2">
      <div className="container mx-auto w-full my-16 flex flex-col items-center justify-between space-y-8 md:space-y-0 md:flex-row md:flex-wrap md:max-w-6xl md:gap-6">
        {state.recipes &&
          state.recipes.length > 0 &&
          state.recipes.map((recipe: recipe) => {
            return <RecipeItem key={recipe._id} data={recipe} />;
          })}
      </div>
      {/* Pagination buttons */}
      <div className="container mx-auto text-center my-10 ">
        {/* Display your data here */}
        {/* Display pagination buttons here */}
        <button
          className="bg-white text-gray-800 rounded-l-md border-r border-navpink py-2 hover:bg-navpink hover:text-white px-3"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-white text-gray-800 rounded-r-md py-2 border-l border-navpink hover:bg-navpink hover:text-white px-3"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
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
