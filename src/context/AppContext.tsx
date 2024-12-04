import React, { createContext, useContext, useReducer } from "react";

// Importez les types nécessaires
import { AppState, AppAction } from "../types";

// Initialisez l'état global de l'application
export const initialState: AppState = {
  clients: [],
  documents: [],
  companySettings: {
    name: "Nom de l'entreprise",
    address: "Adresse",
    postalCode: "Code postal",
    city: "Ville",
    phone: "Téléphone",
    email: "Email",
    website: "Site web",
    siret: "SIRET",
  },
  todos: [],
};

// Définissez le contexte avec une valeur par défaut
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

// Créez le reducer pour gérer les actions
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "UPDATE_COMPANY_SETTINGS":
      return {
        ...state,
        companySettings: {
          ...state.companySettings,
          ...action.payload, // Mise à jour des paramètres de l'entreprise
        },
      };
    case "ADD_CLIENT":
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };
    case "UPDATE_CLIENT":
      return {
        ...state,
        clients: state.clients.map((client) =>
          client.id === action.payload.id ? action.payload : client
        ),
      };
    case "DELETE_CLIENT":
      return {
        ...state,
        clients: state.clients.filter((client) => client.id !== action.payload),
      };
    case "ADD_DOCUMENT":
      return {
        ...state,
        documents: [...state.documents, action.payload],
      };
    case "UPDATE_DOCUMENT":
      return {
        ...state,
        documents: state.documents.map((doc) =>
          doc.id === action.payload.id ? action.payload : doc
        ),
      };
    case "DELETE_DOCUMENT":
      return {
        ...state,
        documents: state.documents.filter((doc) => doc.id !== action.payload),
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};

// Créez le fournisseur de contexte
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Créez un hook personnalisé pour utiliser le contexte
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
