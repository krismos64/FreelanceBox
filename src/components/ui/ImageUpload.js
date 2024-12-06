import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from './Button';
export const ImageUpload = ({ value, onChange, onClear, label }) => {
    const inputRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: label }), _jsxs("div", { className: "flex items-center gap-4", children: [value ? (_jsxs("div", { className: "relative", children: [_jsx("img", { src: value, alt: "Logo", className: "w-32 h-32 object-contain border rounded-lg bg-white dark:bg-gray-800" }), _jsx("button", { onClick: onClear, className: "absolute -top-2 -right-2 p-1 bg-red-100 dark:bg-red-900 rounded-full text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800", children: _jsx(X, { size: 16 }) })] })) : (_jsxs("div", { onClick: () => inputRef.current?.click(), className: "w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary-500 dark:hover:border-primary-400", children: [_jsx(Upload, { className: "w-6 h-6 text-gray-400" }), _jsx("span", { className: "text-sm text-gray-500 dark:text-gray-400 text-center px-2", children: "Cliquez pour ajouter un logo" })] })), value && (_jsx(Button, { type: "button", variant: "secondary", onClick: () => inputRef.current?.click(), children: "Changer le logo" }))] }), _jsx("input", { ref: inputRef, type: "file", className: "hidden", accept: "image/*", onChange: handleFileChange }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Format recommand\u00E9 : PNG ou JPG, max 1MB" })] }));
};
