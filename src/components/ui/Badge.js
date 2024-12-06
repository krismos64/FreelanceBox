import { jsx as _jsx } from "react/jsx-runtime";
export const Badge = ({ status, children, className = '' }) => {
    const styles = {
        'Généré': 'bg-gray-100 text-gray-800',
        'Envoyé': 'bg-blue-100 text-blue-800',
        'Accepté': 'bg-green-100 text-green-800',
        'Rejeté': 'bg-red-100 text-red-800',
        'Payé': 'bg-purple-100 text-purple-800',
    };
    return (_jsx("span", { className: `px-2 py-1 text-sm font-medium rounded-full ${styles[status]} ${className}`, children: children }));
};
