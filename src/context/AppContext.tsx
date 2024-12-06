import React, { createContext, useContext, useReducer } from "react";

// Définition des types nécessaires
export interface CompanySettings {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  siret: string;
  logo?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  siret?: string;
}

export interface ServiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Document {
  id: string;
  type: "invoice" | "quote";
  number: string;
  date: string;
  client: Client;
  items: ServiceItem[];
  status: "Payé" | "Envoyé" | "Rejeté" | "Généré" | "Accepté";
  subtotal: number;
  total: number;
  notes?: string;
  validUntil?: string;
  dueDate?: string;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
}

export interface AppState {
  clients: Client[];
  documents: Document[];
  companySettings: CompanySettings;
  todos: Todo[];
}

// Définition des types d'actions
export type AppAction =
  | { type: "UPDATE_COMPANY_SETTINGS"; payload: Partial<CompanySettings> }
  | { type: "ADD_CLIENT"; payload: Client }
  | { type: "UPDATE_CLIENT"; payload: Client }
  | { type: "DELETE_CLIENT"; payload: string }
  | { type: "ADD_DOCUMENT"; payload: Document }
  | { type: "UPDATE_DOCUMENT"; payload: Document }
  | { type: "DELETE_DOCUMENT"; payload: string }
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "UPDATE_TODO"; payload: Todo }
  | { type: "DELETE_TODO"; payload: string };

// Initialisez l'état global de l'application
export const initialState: AppState = {
  clients: [],
  documents: [] as Document[],
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
  dispatch: () => {}, // Fonction vide par défaut
});

// Créez le reducer pour gérer les actions
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "UPDATE_COMPANY_SETTINGS":
      return {
        ...state,
        companySettings: {
          ...state.companySettings,
          ...action.payload,
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
      return state;
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
