import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../types/auth";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useAuthService } from "../../hooks/useAuth";
const LoginPage = () => {
    const { handleLogin } = useAuthService();
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(loginSchema),
    });
    // Forcer le mode clair uniquement sur cette page
    useEffect(() => {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        // Nettoyage (optionnel, si vous souhaitez revenir au thème global lors de la navigation)
        return () => {
            document.documentElement.classList.remove("light");
        };
    }, []);
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 px-4", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "max-w-md w-full", children: [_jsxs("div", { className: "flex flex-col items-center mb-8", children: [_jsx(motion.img, { src: "/logo.png", alt: "FreelanceBox", className: "w-90 h-90 mb-1", initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.5 } }), _jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Connexion \u00E0 FreelanceBox" }), _jsx("p", { className: "mt-2 text-gray-600", children: "G\u00E9rez votre activit\u00E9 en toute simplicit\u00E9" })] }), _jsxs("div", { className: "bg-white p-8 rounded-lg shadow-sm", children: [_jsxs("form", { onSubmit: handleSubmit(handleLogin), className: "space-y-6", children: [_jsx(Input, { label: "Email", type: "email", error: errors.email?.message, ...register("email") }), _jsx(Input, { label: "Mot de passe", type: "password", error: errors.password?.message, ...register("password") }), _jsx(Button, { type: "submit", className: "w-full", disabled: isSubmitting, children: isSubmitting ? "Connexion..." : "Se connecter" })] }), _jsx("div", { className: "mt-6 text-center", children: _jsxs("p", { className: "text-sm text-gray-600", children: ["Pas encore de compte ?", " ", _jsx(Link, { to: "/register", className: "text-primary-600 hover:text-primary-500", children: "Cr\u00E9er un compte" })] }) })] })] }) }));
};
export default LoginPage;
