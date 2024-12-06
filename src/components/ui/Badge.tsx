import React from 'react';

interface BadgeProps {
  status: 'Généré' | 'Envoyé' | 'Accepté' | 'Rejeté' | 'Payé';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, children, className = '' }) => {
  const styles = {
    'Généré': 'bg-gray-100 text-gray-800',
    'Envoyé': 'bg-blue-100 text-blue-800',
    'Accepté': 'bg-green-100 text-green-800',
    'Rejeté': 'bg-red-100 text-red-800',
    'Payé': 'bg-purple-100 text-purple-800',
  };

  return (
    <span
      className={`px-2 py-1 text-sm font-medium rounded-full ${styles[status]} ${className}`}
    >
      {children}
    </span>
  );
};