import React, { createContext, useReducer } from "react";
import { MyState, MyAction, MyContextType } from "../interfaces/recipe";
import Props from "../interfaces/children";

const initialState: MyState = {
  recipes: undefined,
  recipe: null,
  searchTerm: null,
};

export const RecipesContext = createContext<MyContextType>({
  state: initialState,
  dispatch: () => {},
});

const recipesReducer = (state: MyState, action: MyAction): MyState => {
  switch (action.type) {
    case "SET_RECIPES":
      return {
        ...state,
        recipes: action.payload.recipes ?? state.recipes,
        recipe: action.payload.recipe ?? state.recipe,
      };
    case "ADD_RECIPE":
      return {
        ...state,
        recipe: action.payload.recipe ?? state.recipe,
        recipes: [action.payload.recipe!, ...state.recipes!] ?? state.recipes,
      };
    case "DELETE_RECIPE":
      return {
        ...state,
        recipes:
          state.recipes?.filter(
            (recipe) => recipe._id !== action.payload.recipe?._id
          ) ?? state.recipes,
        recipe: action.payload.recipe ?? state.recipe,
      };
    case "SEARCH":
      return {
        ...state,
        searchTerm: action.payload.searchTerm ?? state.searchTerm,
      };
    default:
      return state;
  }
};

const RecipesContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(recipesReducer, initialState);

  return (
    <RecipesContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;
