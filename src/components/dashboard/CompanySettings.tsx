import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { CompanySettings as CompanySettingsType } from '../../types';

export const CompanySettings: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState<CompanySettingsType>(state.companySettings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_COMPANY_SETTINGS', payload: settings });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <Card>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Informations de l'entreprise</h2>
          <Button variant="secondary" onClick={() => setIsEditing(true)}>
            Modifier
          </Button>
        </div>
        <div className="space-y-2">
          <p><span className="font-medium">Nom :</span> {settings.name || '-'}</p>
          <p><span className="font-medium">Adresse :</span> {settings.address || '-'}</p>
          <p><span className="font-medium">Code postal :</span> {settings.postalCode || '-'}</p>
          <p><span className="font-medium">Ville :</span> {settings.city || '-'}</p>
          <p><span className="font-medium">Téléphone :</span> {settings.phone || '-'}</p>
          <p><span className="font-medium">Email :</span> {settings.email || '-'}</p>
          <p><span className="font-medium">Site web :</span> {settings.website || '-'}</p>
          <p><span className="font-medium">SIRET :</span> {settings.siret || '-'}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Modifier les informations</h2>
        <div className="space-y-4">
          <Input
            label="Nom de l'entreprise"
            value={settings.name}
            onChange={(e) => setSettings((prev) => ({ ...prev, name: e.target.value }))}
          />
          <Input
            label="Adresse"
            value={settings.address}
            onChange={(e) => setSettings((prev) => ({ ...prev, address: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-4">
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
          <Input
            label="SIRET"
            value={settings.siret}
            onChange={(e) => setSettings((prev) => ({ ...prev, siret: e.target.value }))}
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
            Annuler
          </Button>
          <Button type="submit">
            Enregistrer
          </Button>
        </div>
      </form>
    </Card>
  );
};