import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export const Card = ({ children, className = '' }) => {
    return (_jsx(motion.div, { className: `card p-6 ${className}`, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, whileHover: { y: -2 }, children: children }));
};
