import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { ImageUpload } from "../components/ui/ImageUpload";
import { CompanyOverview } from "../components/company/CompanyOverview";
import { useApp } from "../context/AppContext";
import { PageTransition } from "../components/PageTransition";
import { showSuccess, showError } from "../utils/notifications";
const CompanyPage = () => {
    const { state, dispatch } = useApp();
    const [settings, setSettings] = useState(state.companySettings || {
        name: "",
        address: "",
        city: "",
        postalCode: "",
        phone: "",
        email: "",
        website: "",
        siret: "",
        logo: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validateURL = (url) => {
        try {
            new URL(url);
            return true;
        }
        catch (_) {
            return false;
        }
    };
    const validateForm = () => {
        if (!settings.name || !settings.email || !settings.address) {
            showError("Veuillez remplir tous les champs obligatoires.");
            return false;
        }
        if (!validateEmail(settings.email)) {
            showError("Veuillez entrer une adresse email valide.");
            return false;
        }
        if (settings.website && !validateURL(settings.website)) {
            showError("Veuillez entrer une URL valide pour le site web.");
            return false;
        }
        return true;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsModalOpen(true);
        }
    };
    const handleConfirm = async () => {
        try {
            await saveCompanySettingsToDatabase(settings, dispatch);
            setIsModalOpen(false);
            setIsEditing(false);
        }
        catch (error) {
            showError("Une erreur est survenue lors de l'enregistrement.");
        }
    };
    if (!isEditing) {
        return (_jsx(PageTransition, { children: _jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800 dark:text-white", children: "Mon Entreprise" }), _jsx(CompanyOverview, { settings: state.companySettings, onEdit: () => setIsEditing(true) })] }) }));
    }
    return (_jsx(PageTransition, { children: _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-800 dark:text-white", children: "Modifier les informations" }), _jsx(Button, { variant: "secondary", onClick: () => setIsEditing(false), children: "Retour" })] }), _jsx(Card, { children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsx(ImageUpload, { label: "Logo de l'entreprise", value: settings.logo, onChange: (value) => setSettings((prev) => ({ ...prev, logo: value })), onClear: () => setSettings((prev) => ({ ...prev, logo: undefined })) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(Input, { label: "Nom de l'entreprise", value: settings.name, onChange: (e) => setSettings((prev) => ({ ...prev, name: e.target.value })) }), _jsx(Input, { label: "SIRET", value: settings.siret, onChange: (e) => setSettings((prev) => ({ ...prev, siret: e.target.value })) }), _jsx(Input, { label: "T\u00E9l\u00E9phone", value: settings.phone, onChange: (e) => setSettings((prev) => ({ ...prev, phone: e.target.value })) }), _jsx(Input, { label: "Email", type: "email", value: settings.email, onChange: (e) => setSettings((prev) => ({ ...prev, email: e.target.value })) }), _jsx(Input, { label: "Site web", value: settings.website, onChange: (e) => setSettings((prev) => ({ ...prev, website: e.target.value })) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-800 dark:text-white", children: "Adresse" }), _jsx(Input, { label: "Adresse", value: settings.address, onChange: (e) => setSettings((prev) => ({ ...prev, address: e.target.value })) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(Input, { label: "Code postal", value: settings.postalCode, onChange: (e) => setSettings((prev) => ({
                                                    ...prev,
                                                    postalCode: e.target.value,
                                                })) }), _jsx(Input, { label: "Ville", value: settings.city, onChange: (e) => setSettings((prev) => ({ ...prev, city: e.target.value })) })] })] }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { type: "submit", children: "Enregistrer les modifications" }) })] }) }), _jsx(Modal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), title: "Confirmer les modifications", onConfirm: handleConfirm, confirmText: "Enregistrer", children: _jsx("p", { children: "\u00CAtes-vous s\u00FBr de vouloir mettre \u00E0 jour les informations de l'entreprise ?" }) })] }) }));
};
const saveCompanySettingsToDatabase = async (settings, dispatch) => {
    try {
        const response = await fetch("/api/company/settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(settings),
        });
        if (response.ok) {
            const data = await response.json();
            dispatch({ type: "UPDATE_COMPANY_SETTINGS", payload: data });
            showSuccess("Les informations de l'entreprise ont été mises à jour");
        }
        else {
            const error = await response.json();
            showError(`Erreur : ${error.message || "Une erreur est survenue."}`);
        }
    }
    catch (error) {
        showError("Impossible de contacter le serveur. Vérifiez votre connexion.");
    }
};
export default CompanyPage;
