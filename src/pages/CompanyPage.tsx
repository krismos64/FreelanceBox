import React, { useState } from "react";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { ImageUpload } from "../components/ui/ImageUpload";
import { CompanyOverview } from "../components/company/CompanyOverview";
import { useApp } from "../context/AppContext";
import { CompanySettings } from "../types";
import { PageTransition } from "../components/PageTransition";
import { showSuccess, showError } from "../utils/notifications";

const CompanyPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const [settings, setSettings] = useState<CompanySettings>(
    state.companySettings || {
      name: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
      email: "",
      website: "",
      siret: "",
      logo: "",
    }
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const validateForm = (): boolean => {
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

  const handleSubmit = (e: React.FormEvent) => {
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
    } catch (error) {
      showError("Une erreur est survenue lors de l'enregistrement.");
    }
  };

  if (!isEditing) {
    return (
      <PageTransition>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Mon Entreprise
          </h1>
          <CompanyOverview
            settings={state.companySettings}
            onEdit={() => setIsEditing(true)}
          />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Modifier les informations
          </h1>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Retour
          </Button>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <ImageUpload
              label="Logo de l'entreprise"
              value={settings.logo}
              onChange={(value) =>
                setSettings((prev) => ({ ...prev, logo: value }))
              }
              onClear={() =>
                setSettings((prev) => ({ ...prev, logo: undefined }))
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nom de l'entreprise"
                value={settings.name}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <Input
                label="SIRET"
                value={settings.siret}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, siret: e.target.value }))
                }
              />
              <Input
                label="Téléphone"
                value={settings.phone}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
              <Input
                label="Email"
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <Input
                label="Site web"
                value={settings.website}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, website: e.target.value }))
                }
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Adresse
              </h2>
              <Input
                label="Adresse"
                value={settings.address}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, address: e.target.value }))
                }
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Code postal"
                  value={settings.postalCode}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      postalCode: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Ville"
                  value={settings.city}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, city: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Enregistrer les modifications</Button>
            </div>
          </form>
        </Card>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Confirmer les modifications"
          onConfirm={handleConfirm}
          confirmText="Enregistrer"
        >
          <p>
            Êtes-vous sûr de vouloir mettre à jour les informations de
            l'entreprise ?
          </p>
        </Modal>
      </div>
    </PageTransition>
  );
};

const saveCompanySettingsToDatabase = async (
  settings: CompanySettings,
  dispatch: React.Dispatch<any>
) => {
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
    } else {
      const error = await response.json();
      showError(`Erreur : ${error.message || "Une erreur est survenue."}`);
    }
  } catch (error) {
    showError("Impossible de contacter le serveur. Vérifiez votre connexion.");
  }
};

export default CompanyPage;
