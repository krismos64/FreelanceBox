import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Client } from '../../types';
import { useApp } from '../../context/AppContext';

interface ClientFormProps {
  onSubmit: () => void;
  initialData?: Client | null;
}

export const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, initialData }) => {
  const { dispatch } = useApp();
  const [client, setClient] = useState<Client>(
    initialData || {
      id: uuidv4(),
      name: '',
      email: '',
      phone: '',
      address: '',
      postalCode: '',
      city: '',
      siret: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      dispatch({ type: 'UPDATE_CLIENT', payload: client });
    } else {
      dispatch({ type: 'ADD_CLIENT', payload: client });
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nom"
            required
            value={client.name}
            onChange={(e) => setClient((prev) => ({ ...prev, name: e.target.value }))}
          />
          <Input
            label="Email"
            type="email"
            required
            value={client.email}
            onChange={(e) => setClient((prev) => ({ ...prev, email: e.target.value }))}
          />
          <Input
            label="Téléphone"
            value={client.phone}
            onChange={(e) => setClient((prev) => ({ ...prev, phone: e.target.value }))}
          />
          <Input
            label="SIRET"
            value={client.siret}
            onChange={(e) => setClient((prev) => ({ ...prev, siret: e.target.value }))}
          />
          <div className="col-span-2">
            <Input
              label="Adresse"
              required
              value={client.address}
              onChange={(e) => setClient((prev) => ({ ...prev, address: e.target.value }))}
            />
          </div>
          <Input
            label="Code postal"
            required
            value={client.postalCode}
            onChange={(e) => setClient((prev) => ({ ...prev, postalCode: e.target.value }))}
          />
          <Input
            label="Commune"
            required
            value={client.city}
            onChange={(e) => setClient((prev) => ({ ...prev, city: e.target.value }))}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <Button type="submit">
            {initialData ? 'Mettre à jour' : 'Enregistrer'} le client
          </Button>
        </div>
      </Card>
    </form>
  );
};