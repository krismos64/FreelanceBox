import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { ImageUpload } from '../components/ui/ImageUpload';
import { CompanyOverview } from '../components/company/CompanyOverview';
import { useApp } from '../context/AppContext';
import { CompanySettings } from '../types';
import { PageTransition } from '../components/PageTransition';
import { showSuccess } from '../utils/notifications';

const CompanyPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const [settings, setSettings] = useState<CompanySettings>(state.companySettings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    dispatch({ type: 'UPDATE_COMPANY_SETTINGS', payload: settings });
    setIsModalOpen(false);
    setIsEditing(false);
    showSuccess('Les informations de l\'entreprise ont été mises à jour');
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
              onChange={(value) => setSettings((prev) => ({ ...prev, logo: value }))}
              onClear={() => setSettings((prev) => ({ ...prev, logo: undefined }))}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nom de l'entreprise"
                value={settings.name}
                onChange={(e) => setSettings((prev) => ({ ...prev, name: e.target.value }))}
              />
              <Input
                label="SIRET"
                value={settings.siret}
                onChange={(e) => setSettings((prev) => ({ ...prev, siret: e.target.value }))}
              />
              <Input
                label="Téléphone"
                value={settings.phone}
                onChange={(e) => setSettings((prev) => ({ ...prev, phone: e.target.value }))}
              />
              <Input
                label="Email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
              />
              <Input
                label="Site web"
                value={settings.website}
                onChange={(e) => setSettings((prev) => ({ ...prev, website: e.target.value }))}
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Adresse</h2>
              <Input
                label="Adresse"
                value={settings.address}
                onChange={(e) => setSettings((prev) => ({ ...prev, address: e.target.value }))}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Code postal"
                  value={settings.postalCode}
                  onChange={(e) => setSettings((prev) => ({ ...prev, postalCode: e.target.value }))}
                />
                <Input
                  label="Ville"
                  value={settings.city}
                  onChange={(e) => setSettings((prev) => ({ ...prev, city: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                Enregistrer les modifications
              </Button>
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
          <p>Êtes-vous sûr de vouloir mettre à jour les informations de l'entreprise ?</p>
        </Modal>
      </div>
    </PageTransition>
  );
};

export default CompanyPage;