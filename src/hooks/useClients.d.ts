import { Client } from "../types";
export declare const useClients: () => {
    clients: any;
    isLoading: boolean;
    createClient: import("@tanstack/react-query").UseMutateFunction<any, Error, Omit<Client, "id">, unknown>;
    updateClient: import("@tanstack/react-query").UseMutateFunction<any, Error, {
        id: string;
        client: Partial<Client>;
    }, unknown>;
    deleteClient: import("@tanstack/react-query").UseMutateFunction<void, Error, string, unknown>;
};
//# sourceMappingURL=useClients.d.ts.map