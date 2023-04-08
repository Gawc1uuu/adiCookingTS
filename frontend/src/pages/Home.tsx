import { useEffect, useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import plus from "../assets/plus.png";
import { RecipesContext } from "../context/RecipesContext";
import RecipesList from "../components/RecipesList";
import PaginationButtons from "../components/PaginationButtons";

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

  return (
    <div className="mx-2">
      <RecipesList data={state.recipes} />
      {/* Pagination buttons */}
      <PaginationButtons
        onChangePage={{
          handlePrevPage,
          handleNextPage,
          currentPage,
          totalPages,
        }}
      />
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
