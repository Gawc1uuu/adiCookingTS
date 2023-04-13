import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(false);

    axios
      .post("https://adicooking-api.onrender.com/api/user/signup", {
        username,
        email,
        password,
      })
      .then((response) => {
        dispatch({ type: "LOGIN", payload: response.data });
        localStorage.setItem("user", JSON.stringify(response.data));
        setIsLoading(false);
        setError(false);
      })
      .catch((error: AxiosError) => {
        setIsLoading(false);
        setError(error.response?.data);
      });
  };

  // save token to local storage

  return { signup, isLoading, error };
};
