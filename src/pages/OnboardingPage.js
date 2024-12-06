import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../animations/welcome.json";
const OnboardingPage = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    };
    const handleSignUp = () => {
        navigate("/register");
    };
    return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white", children: [_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { duration: 1, ease: "easeOut" }, children: _jsx(Lottie, { animationData: animationData, className: "w-72 h-72 mb-8" }) }), _jsxs(motion.div, { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut" }, className: "text-center", children: [_jsx("h1", { className: "text-5xl font-bold mb-4", children: "Bienvenue sur FreelanceBox" }), _jsx("p", { className: "text-lg font-light mb-8", children: "G\u00E9rez votre activit\u00E9 freelance facilement et efficacement." })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }, className: "flex space-x-4", children: [_jsx("button", { onClick: handleLogin, className: "bg-white text-blue-500 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300", children: "Connexion" }), _jsx("button", { onClick: handleSignUp, className: "bg-white text-purple-500 px-6 py-3 rounded-lg shadow-lg hover:bg-purple-600 hover:text-white transition-all duration-300", children: "Cr\u00E9er un compte" })] }), _jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { duration: 1, ease: "easeOut", delay: 0.6 }, className: "absolute bottom-10 text-sm font-light", children: _jsx("p", { children: "\u00A9 2024 FreelanceBox. Tous droits r\u00E9serv\u00E9s." }) })] }));
};
export default OnboardingPage;
