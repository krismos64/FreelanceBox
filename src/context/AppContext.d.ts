import React from "react";
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
export type AppAction = {
    type: "UPDATE_COMPANY_SETTINGS";
    payload: Partial<CompanySettings>;
} | {
    type: "ADD_CLIENT";
    payload: Client;
} | {
    type: "UPDATE_CLIENT";
    payload: Client;
} | {
    type: "DELETE_CLIENT";
    payload: string;
} | {
    type: "ADD_DOCUMENT";
    payload: Document;
} | {
    type: "UPDATE_DOCUMENT";
    payload: Document;
} | {
    type: "DELETE_DOCUMENT";
    payload: string;
} | {
    type: "ADD_TODO";
    payload: Todo;
} | {
    type: "UPDATE_TODO";
    payload: Todo;
} | {
    type: "DELETE_TODO";
    payload: string;
};
export declare const initialState: AppState;
export declare const AppProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useApp: () => {
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
};
//# sourceMappingURL=AppContext.d.ts.map