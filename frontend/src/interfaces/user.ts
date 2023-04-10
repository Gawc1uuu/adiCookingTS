export interface User {
  user_id: string;
  username: string;
  token: string;
}

export interface AuthState {
  user: User | null;
}

export interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload: User | null;
}

export interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}
