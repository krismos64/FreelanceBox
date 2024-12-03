import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../../types/auth";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useAuthService } from "../../hooks/useAuth";

const LoginPage: React.FC = () => {
  const { handleLogin } = useAuthService();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.img
            src="/logo.png"
            alt="FreelanceBox"
            className="w-90 h-90 mb-1"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Connexion à FreelanceBox
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gérez votre activité en toute simplicité
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <Input
              label="Email"
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Mot de passe"
              type="password"
              error={errors.password?.message}
              {...register("password")}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pas encore de compte ?{" "}
              <Link
                to="/register"
                className="text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
