import React from 'react';
import { Building2, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { CompanySettings } from '../../types';

interface CompanyOverviewProps {
  settings: CompanySettings;
  onEdit: () => void;
}

export const CompanyOverview: React.FC<CompanyOverviewProps> = ({ settings, onEdit }) => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary-500 to-primary-600" />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            {settings.logo ? (
              <img
                src={settings.logo}
                alt="Logo"
                className="w-16 h-16 object-contain rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                <Building2 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {settings.name || 'Mon Entreprise'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                SIRET: {settings.siret || 'Non renseigné'}
              </p>
            </div>
          </div>
          <Button onClick={onEdit}>
            Modifier les informations
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">
                {settings.email || 'Email non renseigné'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">
                {settings.phone || 'Téléphone non renseigné'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">
                {settings.website || 'Site web non renseigné'}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-gray-600 dark:text-gray-300">{settings.address || 'Adresse non renseignée'}</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {settings.postalCode} {settings.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};