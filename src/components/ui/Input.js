import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
export const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
    return (_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: label }), _jsx("input", { ref: ref, className: `w-full px-3 py-2 bg-white dark:bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} dark:text-white ${className}`, ...props }), error && _jsx("p", { className: "mt-1 text-sm text-red-500", children: error })] }));
});
Input.displayName = 'Input';
