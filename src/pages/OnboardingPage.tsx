import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../animations/welcome.json";

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      {/* Animation Lottie */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Lottie animationData={animationData} className="w-72 h-72 mb-8" />
      </motion.div>

      {/* Titre principal */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold mb-4">Bienvenue sur FreelanceBox</h1>
        <p className="text-lg font-light mb-8">
          Gérez votre activité freelance facilement et efficacement.
        </p>
      </motion.div>

      {/* Boutons */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="flex space-x-4"
      >
        <button
          onClick={handleLogin}
          className="bg-white text-blue-500 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          Connexion
        </button>
        <button
          onClick={handleSignUp}
          className="bg-white text-purple-500 px-6 py-3 rounded-lg shadow-lg hover:bg-purple-600 hover:text-white transition-all duration-300"
        >
          Créer un compte
        </button>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        className="absolute bottom-10 text-sm font-light"
      >
        <p>© 2024 FreelanceBox. Tous droits réservés.</p>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;
