import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';
export const Modal = ({ isOpen, onClose, title, children, onConfirm, confirmText = 'Confirmer', cancelText = 'Annuler', }) => {
    if (!isOpen)
        return null;
    return (_jsx(AnimatePresence, { children: _jsx("div", { className: "fixed inset-0 z-50 overflow-y-auto", children: _jsxs("div", { className: "flex min-h-screen items-center justify-center p-4", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black bg-opacity-25", onClick: onClose }), _jsxs(motion.div, { initial: { scale: 0.95, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.95, opacity: 0 }, className: "relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: title }), _jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-500 dark:hover:text-gray-300", children: _jsx(X, { size: 20 }) })] }), _jsx("div", { className: "mt-2", children: _jsx("div", { className: "text-gray-700 dark:text-gray-300", children: children }) }), _jsxs("div", { className: "mt-6 flex justify-end gap-3", children: [_jsx(Button, { variant: "secondary", onClick: onClose, children: cancelText }), onConfirm && (_jsx(Button, { onClick: onConfirm, children: confirmText }))] })] })] }) }) }));
};
