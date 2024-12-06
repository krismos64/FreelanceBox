import { Client, Document, CompanySettings } from '../types';
declare const api: import("axios").AxiosInstance;
export declare const fetchClients: () => Promise<any>;
export declare const createClient: (client: Omit<Client, "id">) => Promise<any>;
export declare const updateClient: (id: string, client: Partial<Client>) => Promise<any>;
export declare const deleteClient: (id: string) => Promise<void>;
export declare const fetchDocuments: () => Promise<any>;
export declare const createDocument: (document: Omit<Document, "id">) => Promise<any>;
export declare const updateDocument: (id: string, document: Partial<Document>) => Promise<any>;
export declare const deleteDocument: (id: string) => Promise<void>;
export declare const fetchCompanySettings: () => Promise<any>;
export declare const updateCompanySettings: (settings: CompanySettings) => Promise<any>;
export default api;
//# sourceMappingURL=api.d.ts.map