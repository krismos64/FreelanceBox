import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Définir les types pour l'état de l'authentification et les actions
interface AuthState {
  isAuthenticated: boolean;
  user?: object | null; // Remplacez `object` par le type spécifique à votre utilisateur si disponible
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: { user?: object; token?: string };
}

// Définir l'état initial
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

// Créer les contextes pour l'état et le dispatch
const AuthContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<
  React.Dispatch<AuthAction> | undefined
>(undefined);

// Reducer pour gérer les actions liées à l'authentification
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload?.user || null,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Fournisseur d'authentification
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

// Hook pour accéder à l'état de l'authentification
export const useAuthState = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
};

// Hook pour accéder au dispatch d'authentification
export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (!context) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return context;
};

// Hook combiné pour l'état et le dispatch
export const useAuth = () => {
  return {
    ...useAuthState(),
    dispatch: useAuthDispatch(),
  };
};
