import { Document } from "../types";
export declare const useDocuments: () => {
    documents: any;
    isLoading: boolean;
    createDocument: import("@tanstack/react-query").UseMutateFunction<any, Error, Omit<Document, "id">, unknown>;
    updateDocument: import("@tanstack/react-query").UseMutateFunction<any, Error, {
        id: string;
        document: Partial<Document>;
    }, unknown>;
    deleteDocument: import("@tanstack/react-query").UseMutateFunction<void, Error, string, unknown>;
};
//# sourceMappingURL=useDocuments.d.ts.map