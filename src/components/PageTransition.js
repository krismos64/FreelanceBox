import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export const PageTransition = ({ children }) => {
    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.2 }, children: children }));
};
