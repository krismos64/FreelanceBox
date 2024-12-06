import React from "react";
interface DocumentFiltersProps {
    onStatusChange: (status: string) => void;
    onSearch: (value: string) => void;
    onDateSort: (direction: "asc" | "desc") => void;
    type: string;
}
export declare const DocumentFilters: React.FC<DocumentFiltersProps>;
export {};
//# sourceMappingURL=DocumentFilters.d.ts.map