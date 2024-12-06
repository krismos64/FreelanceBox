import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { playStartupSound } from "../utils/sound";
const SplashScreen = ({ onComplete }) => {
    useEffect(() => {
        playStartupSound();
    }, []);
    return (_jsxs(motion.div, { className: "fixed inset-0 flex flex-col items-center justify-center bg-navy-900 z-50", initial: { opacity: 1 }, animate: { opacity: 0 }, transition: { duration: 4, delay: 5 }, onAnimationComplete: onComplete, children: [_jsx(motion.div, { initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 2.5 }, children: _jsx("img", { src: "/logo.png", alt: "FreelanceBox", className: "w-80 h-80 mb-8" }) }), _jsx(motion.h1, { className: "text-4xl font-bold text-white mb-4", initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.5, duration: 1.5 }, children: "FreelanceBox" }), _jsx(motion.p, { className: "text-lg text-pink-400 text-center max-w-md px-4", initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 1.8, duration: 0.5 }, children: "Simplifiez votre gestion, concentrez-vous sur votre passion" })] }));
};
export default SplashScreen;
