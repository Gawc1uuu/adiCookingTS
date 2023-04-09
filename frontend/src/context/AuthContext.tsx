import React, { createContext, useReducer } from "react";
import Props from "../interfaces/children";
import { AuthAction, AuthState, AuthContextType } from "../interfaces/user";

export const AuthContext = createContext<AuthContextType>({
  state: {
    user: null,
  },
  dispatch: () => {},
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return {
        ...state,
      };
  }
};

const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
