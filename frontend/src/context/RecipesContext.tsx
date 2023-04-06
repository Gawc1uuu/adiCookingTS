import React, { createContext, useReducer } from "react";
import recipe from "../interfaces/recipe";
import Props from "../interfaces/children";

interface MyState {
  recipes: recipe[] | null;
  recipe: recipe | null;
}

interface MyAction {
  type: "ADD_RECIPE" | "UPDATE_RECIPE" | "DELETE_RECIPE" | "SET_RECIPES";
  payload: {
    recipes?: recipe[];
    recipe?: recipe;
  };
}

interface MyContextType {
  state: MyState;
  dispatch: React.Dispatch<MyAction>;
}

const initialState: MyState = { recipes: null, recipe: null };

export const RecipesContext = createContext<MyContextType>({
  state: initialState,
  dispatch: () => {},
});

const recipesReducer = (state: MyState, action: MyAction): MyState => {
  switch (action.type) {
    case "SET_RECIPES":
      return {
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
    default:
      return state;
  }
};

const RecipesContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(recipesReducer, initialState);

  console.log(state.recipes);

  return (
    <RecipesContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;
