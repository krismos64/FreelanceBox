import React from "react";
import { Document } from "../../types";
interface PDFGeneratorProps {
    document: Document;
    children: (_params: {
        loading: boolean;
    }) => React.ReactNode;
}
export declare const PDFGenerator: React.FC<PDFGeneratorProps>;
export {};
//# sourceMappingURL=PDFGenerator.d.ts.map