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
  type: "quote" | "invoice"; // Typage strict pour les types de document
  number: string;
  date: string; // Date de création du document (format ISO 8601 attendu)
  validUntil?: string; // Date de validité pour un devis (optionnel)
  client: Client; // Le client associé au document
  items: ServiceItem[]; // Les éléments de service inclus dans le document
  subtotal: number; // Sous-total avant taxes
  total: number; // Total après taxes ou ajustements
  notes?: string; // Notes supplémentaires (optionnel)
  status: "Généré" | "Envoyé" | "Accepté" | "Rejeté" | "Payé"; // États possibles d'un document
  dueDate?: string; // Date d'échéance (optionnel, format ISO 8601 attendu)
}

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

export interface TodoItem {
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
  todos: TodoItem[];
}

export type AppAction =
  | { type: "ADD_CLIENT"; payload: Client }
  | { type: "UPDATE_CLIENT"; payload: Client }
  | { type: "DELETE_CLIENT"; payload: string }
  | { type: "ADD_DOCUMENT"; payload: Document }
  | { type: "UPDATE_DOCUMENT"; payload: Document }
  | { type: "DELETE_DOCUMENT"; payload: string }
  | { type: "UPDATE_COMPANY_SETTINGS"; payload: CompanySettings }
  | { type: "ADD_TODO"; payload: TodoItem }
  | { type: "UPDATE_TODO"; payload: TodoItem }
  | { type: "DELETE_TODO"; payload: string };
