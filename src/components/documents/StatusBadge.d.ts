import React from "react";
import { Document } from "../../types";
interface StatusBadgeProps {
    status: Document["status"];
    onStatusChange?: (newStatus: Document["status"]) => void;
    type: "quote" | "invoice";
}
export declare const StatusBadge: React.FC<StatusBadgeProps>;
export {};
//# sourceMappingURL=StatusBadge.d.ts.map