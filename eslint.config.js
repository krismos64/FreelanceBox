import { configs as tsConfigs } from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default {
  files: ["**/*.{ts,tsx,js,jsx}"], // Spécifie les extensions à lint
  languageOptions: {
    parser: tsParser, // Définit le parser pour TypeScript
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: {
    "@typescript-eslint": tsConfigs.recommended, // Charge les règles recommandées
  },
  rules: {
    "no-unused-vars": "warn", // Exemple de règle
    "no-console": "off", // Exemple de règle
  },
};
