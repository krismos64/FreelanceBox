import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentForm } from '../components/documents/DocumentForm';
import { Document } from '../types';
import { useApp } from '../context/AppContext';

interface CreateDocumentProps {
  type: 'quote' | 'invoice';
}

const CreateDocument: React.FC<CreateDocumentProps> = ({ type }) => {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const handleSubmit = (document: Document) => {
    dispatch({ type: 'ADD_DOCUMENT', payload: document });
    navigate(type === 'quote' ? '/quotes' : '/invoices');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {type === 'quote' ? 'Nouveau devis' : 'Nouvelle facture'}
      </h1>
      <DocumentForm type={type} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateDocument;