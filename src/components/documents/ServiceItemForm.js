import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Trash2 } from "lucide-react";
export const ServiceItemForm = ({ item, onChange, onDelete, }) => {
    const handleChange = (field, value) => {
        const newItem = { ...item };
        if (field === "quantity" || field === "unitPrice") {
            // Convertir en nombre et utiliser 0 si la valeur n'est pas valide
            const numValue = parseFloat(value.toString()) || 0;
            newItem[field] = numValue;
            newItem.total = newItem.quantity * newItem.unitPrice;
        }
        else {
            newItem[field] = value;
        }
        onChange(newItem);
    };
    return (_jsxs("div", { className: "flex gap-4 items-start p-4 bg-gray-50 rounded-lg", children: [_jsx("div", { className: "flex-grow", children: _jsx(Input, { label: "Description", value: item.description, onChange: (e) => handleChange("description", e.target.value) }) }), _jsx("div", { className: "w-32", children: _jsx(Input, { label: "Quantit\u00E9", type: "number", min: "1", step: "1", value: item.quantity.toString(), onChange: (e) => handleChange("quantity", e.target.value) }) }), _jsx("div", { className: "w-32", children: _jsx(Input, { label: "Prix unitaire", type: "number", step: "0.01", min: "0", value: item.unitPrice.toString(), onChange: (e) => handleChange("unitPrice", e.target.value) }) }), _jsx("div", { className: "w-32 pt-7", children: _jsxs("p", { className: "text-right font-medium", children: [item.total.toFixed(2), " \u20AC"] }) }), _jsx(Button, { type: "button", variant: "danger", size: "sm", className: "mt-7", onClick: onDelete, children: _jsx(Trash2, { size: 16 }) })] }));
};
