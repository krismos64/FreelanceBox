import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Utilisation de useNavigate pour une redirection propre
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../../types/auth";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { showError, showSuccess } from "../../utils/notifications";
import { login } from "../../services/auth";

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook pour redirection

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // Gestion du thème clair pour la page de connexion
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    return () => document.documentElement.classList.remove("light");
  }, []);

  const handleLoginSubmit = async (formData: LoginFormData) => {
    try {
      setIsLoading(true);
      const response = await login(formData);

      if (!response?.token || !response?.user) {
        throw new Error("Réponse du serveur invalide");
      }

      // Stocker les informations utilisateur
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      showSuccess("Connexion réussie");

      // Redirection vers OnboardingPage avec mise à jour dynamique
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      showError("Échec de la connexion. Veuillez vérifier vos identifiants.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* En-tête de la page */}
        <div className="flex flex-col items-center mb-8">
          <motion.img
            src="/logo.png"
            alt="FreelanceBox"
            className="w-24 h-24 mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Connexion à FreelanceBox
          </h1>
          <p className="mt-2 text-gray-600 text-center">
            Gérez votre activité en toute simplicité
          </p>
        </div>

        {/* Formulaire de connexion */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form
            onSubmit={handleSubmit(handleLoginSubmit)}
            className="space-y-6"
            autoComplete="on"
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Adresse email
              </label>
              <Input
                id="email"
                label="Adresse email"
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                disabled={isLoading}
                {...register("email")}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <Input
                id="password"
                label="Mot de passe"
                type="password"
                autoComplete="current-password"
                error={errors.password?.message}
                disabled={isLoading}
                {...register("password")}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 transition-colors"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">Connexion en cours</span>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    ⟳
                  </motion.span>
                </span>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>

          {/* Lien vers la page d'inscription */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <Link
                to="/register"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
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
