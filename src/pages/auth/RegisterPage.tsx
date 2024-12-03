import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "../../types/auth";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useAuthService } from "../../hooks/useAuth";

const RegisterPage: React.FC = () => {
  const { handleRegister } = useAuthService();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
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
            className="w-45 h-45 mb-1"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Créer un compte FreelanceBox
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Commencez à gérer votre activité dès maintenant
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
            <Input
              label="Nom"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Email"
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="space-y-2">
              <Input
                label="Mot de passe"
                type="password"
                error={errors.password?.message}
                {...register("password")}
              />
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Le mot de passe doit contenir au moins :</p>
                <ul className="list-disc ml-5 mt-1">
                  <li>8 caractères</li>
                  <li>Une lettre majuscule</li>
                  <li>Un chiffre</li>
                </ul>
              </div>
            </div>

            <Input
              label="Confirmer le mot de passe"
              type="password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer un compte"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Déjà un compte ?{" "}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
