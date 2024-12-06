import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Select } from "../ui/Select";
import { SearchInput } from "../ui/SearchInput";
export const DocumentFilters = ({ onStatusChange, onSearch, onDateSort, type, }) => {
    return (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [_jsx(SearchInput, { onSearch: onSearch }), _jsx(Select, { label: "", options: [
                    { value: "all", label: "Tous les statuts" },
                    { value: "Généré", label: "Généré" },
                    { value: "Envoyé", label: "Envoyé" },
                    { value: "Accepté", label: "Accepté" },
                    { value: "Rejeté", label: "Rejeté" },
                    ...(type === "invoice" ? [{ value: "Payé", label: "Payé" }] : []),
                ], onChange: (e) => onStatusChange(e.target.value) }), _jsx(Select, { label: "", options: [
                    { value: "desc", label: "Plus récent d'abord" },
                    { value: "asc", label: "Plus ancien d'abord" },
                ], onChange: (e) => onDateSort(e.target.value) })] }));
};
