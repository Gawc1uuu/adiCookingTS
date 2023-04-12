interface image {
  public_id: string;
  url: string;
}

export default interface recipe {
  _id: string;
  title: string;
  method: string;
  ingredients: string[];
  image: image;
  cookingTime: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    user_id: string;
    username: string;
  };
  comments: IComment[];
}

export interface MyState {
  recipes: recipe[] | undefined;
  recipe: recipe | null;
  searchTerm: string | null;
}

export interface MyAction {
  type:
    | "ADD_RECIPE"
    | "UPDATE_RECIPE"
    | "DELETE_RECIPE"
    | "SET_RECIPES"
    | "SEARCH";
  payload: {
    recipes?: recipe[];
    recipe?: recipe;
    searchTerm?: string | null;
  };
}

export interface MyContextType {
  state: MyState;
  dispatch: React.Dispatch<MyAction>;
}
export interface IComment {
  _id: string;
  text: string;
  rating: number;
  createdBy: {
    username: string;
    user_id: string;
  };
  createdAt: string;
}
