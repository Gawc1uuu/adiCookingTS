import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const Home = () => {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const getRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/recipes", {
          signal: controller.signal,
        });
        console.log(res);
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

  return <div>Home</div>;
};

export default Home;
