import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ClientForm } from '../components/clients/ClientForm';
import { ClientActions } from '../components/clients/ClientActions';
import { useApp } from '../context/AppContext';
import { Client } from '../types';

const ClientList: React.FC = () => {
  const { state } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleEditClick = (client: Client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingClient(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus size={20} className="mr-2" />
          Nouveau client
        </Button>
      </div>

      {showForm && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">
              {editingClient ? 'Modifier le client' : 'Nouveau client'}
            </h2>
            <Button variant="secondary" onClick={() => {
              setShowForm(false);
              setEditingClient(null);
            }}>
              Annuler
            </Button>
          </div>
          <ClientForm onSubmit={handleFormSubmit} initialData={editingClient} />
        </div>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Nom</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Téléphone</th>
                <th className="text-left py-3 px-4">SIRET</th>
                <th className="text-left py-3 px-4">Adresse</th>
                <th className="text-left py-3 px-4">Code postal</th>
                <th className="text-left py-3 px-4">Commune</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.clients.map((client) => (
                <tr key={client.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{client.name}</td>
                  <td className="py-3 px-4">{client.email}</td>
                  <td className="py-3 px-4">{client.phone}</td>
                  <td className="py-3 px-4">{client.siret}</td>
                  <td className="py-3 px-4">{client.address}</td>
                  <td className="py-3 px-4">{client.postalCode}</td>
                  <td className="py-3 px-4">{client.city}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end">
                      <ClientActions
                        client={client}
                        onEdit={() => handleEditClick(client)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ClientList;