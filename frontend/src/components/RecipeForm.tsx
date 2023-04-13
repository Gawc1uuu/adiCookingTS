import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import plus from "../assets/plus.png";
import { useAuthContext } from "../hooks/useAuthContext";
import ClipLoader from "react-spinners/ClipLoader";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const RecipeForm = () => {
  const navigate = useNavigate();
  const { state: AuthState } = useAuthContext();
  // form states
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [method, setMethod] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | undefined>(
    undefined
  );
  const [selectedFileError, setSelectedFileError] = useState<
    string | undefined
  >(undefined);
  const [cookingTime, setCookingTime] = useState("");
  // error and loading states
  const [error, setError] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // handling file input to add images
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size <= MAX_IMAGE_SIZE) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          setSelectedFile(reader.result as string);
          setSelectedFileError(undefined);
        };
      } else {
        setSelectedFile(undefined);
        setSelectedFileError("This image is too large. Maximum 5mb");
      }
    } else {
      setSelectedFile(undefined);
      setSelectedFileError(undefined);
    }
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!AuthState.user) {
      setError("You must be logged in to add recipes!");
      setIsLoading(false);
      return;
    }

    const newRecipe = {
      title,
      method,
      ingredients,
      cookingTime,
      image: selectedFile,
    };
    console.log(newRecipe);
    try {
      const response = await axios.post(
        "https://adicooking-api.onrender.com/api/recipes",
        {
          ...newRecipe,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthState.user?.token}`,
          },
        }
      );
      setIsLoading(false);
      setError(false);
      navigate("/");
      console.log("Success", response.data);
    } catch (error) {
      console.log("ERRor", (error as AxiosError).response?.data);
      setIsLoading(false);
      setError("Wrong form data");
    }

    setTitle("");
    setCookingTime("");
    setMethod("");
    setIngredient("");
    setIngredients([]);
    setSelectedFile(undefined);
  };

  const addIngredientHandler = () => {
    setIngredients((prevState) => {
      return [...prevState, ingredient];
    });
    setIngredient("");
  };

  return (
    <form onSubmit={submitHandler} className="my-14 space-y-8">
      <div>
        <div>
          <label
            className="text-gray-600 text-lg font-poppins dark:text-white"
            htmlFor="title"
          >
            Recipe Name
          </label>
        </div>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="w-full rounded px-4 py-1 text-gray-600 focus:outline-none dark:text-white dark:bg-gray-500 dark:placeholder:text-white"
          id="title"
          type="text"
          maxLength={55}
          required
        />
      </div>
      <div>
        <div>
          <label
            className="text-gray-600 text-lg font-poppins dark:text-white"
            htmlFor="ingredients"
          >
            Ingredients
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            onChange={(e) => setIngredient(e.target.value)}
            value={ingredient}
            className="w-full rounded px-4 py-1 text-gray-600 focus:outline-none dark:text-white dark:bg-gray-500 dark:placeholder:text-white"
            id="ingredients"
            type="text"
          />
          <button
            disabled={isLoading}
            onClick={addIngredientHandler}
            type="button"
            className="text-center px-2 py-1 bg-[#e68fa9] rounded text-white font-semibold hover:bg-pink-400"
          >
            <img className="invert-[100%] w" src={plus.toString()} alt="plus" />
          </button>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-200">
          Ingredients:{" "}
          {ingredients.map((ing) => (
            <em key={ing}>{ing}, </em>
          ))}
        </p>
      </div>
      <div>
        <div>
          <label
            className="text-gray-600 text-lg font-poppins dark:text-white"
            htmlFor="method"
          >
            How to prepare?
          </label>
        </div>
        <textarea
          required
          onChange={(e) => setMethod(e.target.value)}
          value={method}
          id="method"
          className="px-4 py-2 w-full rounded focus:outline-none dark:text-white dark:bg-gray-500 dark:placeholder:text-white"
        />
      </div>
      <div>
        <label
          className="block mb-2 text-lg font-medium dark:text-white"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          onChange={handleFileChange}
          className="block w-full text-lg text-gray-900 border bg-white border-gray-300 rounded-lg cursor-pointer focus:outline-none dark:text-white dark:bg-gray-500 dark:placeholder:text-white dark:border-gray-300"
          id="file_input"
          accept="image/*"
          type="file"
        />
      </div>
      {selectedFileError && (
        <p className="px-6 py-2 bg-pink-300 border-red-600 text-red-500 rounded">
          {selectedFileError}
        </p>
      )}
      <div>
        <div>
          <label
            className="text-gray-600 text-lg font-poppins dark:text-white"
            htmlFor="time"
          >
            Cooking Time
          </label>
        </div>
        <div className="flex items-center space-x-8">
          <input
            required
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            className="w-1/2 rounded px-4 py-1 text-gray-600 focus:outline-none dark:text-white dark:bg-gray-500 dark:placeholder:text-white"
            id="time"
            type="number"
            min="1"
            max="999"
            step="1"
          />
          {!isLoading && (
            <button
              disabled={isLoading}
              type="submit"
              className="w-1/2 text-center py-1 bg-[#e68fa9] rounded text-white font-semibold hover:bg-pink-400"
            >
              Add recipe
            </button>
          )}
          {isLoading && (
            <button
              disabled={isLoading}
              type="submit"
              className="flex items-center justify-center w-1/2 text-center py-1 bg-[#e68fa9] rounded text-white font-semibold hover:bg-pink-400 opacity-80"
            >
              <ClipLoader
                color={"white"}
                loading={isLoading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </button>
          )}
        </div>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default RecipeForm;
