import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useReducer } from "react";
// Initialisez l'état global de l'application
export const initialState = {
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
const AppContext = createContext({
    state: initialState,
    dispatch: () => { }, // Fonction vide par défaut
});
// Créez le reducer pour gérer les actions
const appReducer = (state, action) => {
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
                clients: state.clients.map((client) => client.id === action.payload.id ? action.payload : client),
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
                documents: state.documents.map((doc) => doc.id === action.payload.id ? action.payload : doc),
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
                todos: state.todos.map((todo) => todo.id === action.payload.id ? action.payload : todo),
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
export const AppProvider = ({ children, }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return (_jsx(AppContext.Provider, { value: { state, dispatch }, children: children }));
};
// Créez un hook personnalisé pour utiliser le contexte
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};
