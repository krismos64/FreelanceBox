import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
export const StatusBadge = ({ status, onStatusChange, type, }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const getAvailableStatuses = () => {
        const baseStatuses = [
            "Généré",
            "Envoyé",
            "Accepté",
            "Rejeté",
        ];
        return type === "invoice" ? [...baseStatuses, "Payé"] : baseStatuses;
    };
    if (!onStatusChange) {
        return _jsx(Badge, { status: status, children: status });
    }
    return (_jsxs("div", { className: "relative", children: [_jsx("div", { onClick: () => setIsOpen(!isOpen), children: _jsx(Badge, { status: status, className: "cursor-pointer", children: status }) }), isOpen && (_jsx("div", { className: "absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5", children: _jsx("div", { className: "py-1", children: getAvailableStatuses().map((newStatus) => (_jsx(Button, { variant: "secondary", className: "w-full text-left px-4 py-2 text-sm hover:bg-gray-100", onClick: () => {
                            onStatusChange(newStatus);
                            setIsOpen(false);
                        }, children: newStatus }, newStatus))) }) }))] }));
};
