import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import plus from "../assets/plus.png";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const RecipeForm = () => {
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
    const newRecipe = {
      title,
      method,
      ingredients,
      cookingTime,
      image: selectedFile,
    };
    console.log(newRecipe);
    try {
      const response = await axios.post("http://localhost:4000/api/recipes", {
        ...newRecipe,
      });
      console.log("Success", response.data);
    } catch (error) {
      console.log("ERRor", (error as AxiosError).response?.data);
    }

    console.log(newRecipe);
    setTitle("");
    setCookingTime("");
    setMethod("");
    setIngredient("");
    setIngredients([]);
    setSelectedFile(undefined);
  };

  const addIngredientHandler = (e: React.MouseEvent) => {
    setIngredients((prevState) => {
      return [...prevState, ingredient];
    });
    setIngredient("");
  };

  return (
    <form onSubmit={submitHandler} className="my-14 space-y-8">
      <div>
        <div>
          <label className="text-gray-600 text-lg font-poppins" htmlFor="title">
            Recipe Name
          </label>
        </div>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="w-full rounded px-4 py-1 text-gray-600 focus:outline-none"
          id="title"
          type="text"
        />
      </div>
      <div>
        <div>
          <label
            className="text-gray-600 text-lg font-poppins"
            htmlFor="ingredients"
          >
            Ingredients
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            onChange={(e) => setIngredient(e.target.value)}
            value={ingredient}
            className="w-full rounded px-4 py-1 text-gray-600 focus:outline-none"
            id="ingredients"
            type="text"
          />
          <button
            onClick={addIngredientHandler}
            type="button"
            className="text-center px-2 py-1 bg-[#e68fa9] rounded text-white font-semibold hover:bg-pink-400"
          >
            <img className="invert-[100%] w" src={plus.toString()} alt="plus" />
          </button>
        </div>
        <p className="text-xs text-gray-400">
          Ingredients:{" "}
          {ingredients.map((ing) => (
            <em key={ing}>{ing}, </em>
          ))}
        </p>
      </div>
      <div>
        <div>
          <label
            className="text-gray-600 text-lg font-poppins"
            htmlFor="method"
          >
            How to prepare?
          </label>
        </div>
        <textarea
          onChange={(e) => setMethod(e.target.value)}
          value={method}
          id="method"
          className="px-4 py-2 w-full rounded focus:outline-none"
        />
      </div>
      <div>
        <label className="block mb-2 text-lg font-medium" htmlFor="file_input">
          Upload file
        </label>
        <input
          onChange={handleFileChange}
          className="block w-full text-lg text-gray-900 border bg-white border-gray-300 rounded-lg cursor-pointer focus:outline-none"
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
          <label className="text-gray-600 text-lg font-poppins" htmlFor="time">
            Cooking Time
          </label>
        </div>
        <div className="flex items-center space-x-8">
          <input
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            className="w-1/2 rounded px-4 py-1 text-gray-600 focus:outline-none"
            id="time"
            type="number"
            min="1"
            max="999"
            step="1"
          />
          <button
            type="submit"
            className="w-1/2 text-center py-1 bg-[#e68fa9] rounded text-white font-semibold hover:bg-pink-400"
          >
            Add recipe
          </button>
        </div>
      </div>
    </form>
  );
};

export default RecipeForm;
