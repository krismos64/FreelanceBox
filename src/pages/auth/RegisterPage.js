import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../types/auth";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useAuthService } from "../../hooks/useAuth";
const RegisterPage = () => {
    const { handleRegister } = useAuthService();
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(registerSchema),
    });
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "max-w-md w-full", children: [_jsxs("div", { className: "flex flex-col items-center mb-8", children: [_jsx(motion.img, { src: "/logo.png", alt: "FreelanceBox", className: "w-45 h-45 mb-1", initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.5 } }), _jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Cr\u00E9er un compte FreelanceBox" }), _jsx("p", { className: "mt-2 text-gray-600 dark:text-gray-400", children: "Commencez \u00E0 g\u00E9rer votre activit\u00E9 d\u00E8s maintenant" })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm", children: [_jsxs("form", { onSubmit: handleSubmit(handleRegister), className: "space-y-6", children: [_jsx(Input, { label: "Nom", error: errors.name?.message, ...register("name") }), _jsx(Input, { label: "Email", type: "email", error: errors.email?.message, ...register("email") }), _jsxs("div", { className: "space-y-2", children: [_jsx(Input, { label: "Mot de passe", type: "password", error: errors.password?.message, ...register("password") }), _jsxs("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: [_jsx("p", { children: "Le mot de passe doit contenir au moins :" }), _jsxs("ul", { className: "list-disc ml-5 mt-1", children: [_jsx("li", { children: "8 caract\u00E8res" }), _jsx("li", { children: "Une lettre majuscule" }), _jsx("li", { children: "Un chiffre" })] })] })] }), _jsx(Input, { label: "Confirmer le mot de passe", type: "password", error: errors.confirmPassword?.message, ...register("confirmPassword") }), _jsx(Button, { type: "submit", className: "w-full", disabled: isSubmitting, children: isSubmitting ? "Création..." : "Créer un compte" })] }), _jsx("div", { className: "mt-6 text-center", children: _jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: ["D\u00E9j\u00E0 un compte ?", " ", _jsx(Link, { to: "/login", className: "text-primary-600 hover:text-primary-500 dark:text-primary-400", children: "Se connecter" })] }) })] })] }) }));
};
export default RegisterPage;
