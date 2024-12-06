import React from 'react';
import { Card } from '../ui/Card';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, trend }) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 dark:text-gray-400 text-sm">{title}</h3>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-gray-800 dark:text-white">{value}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">{trend}</span>
      </div>
    </Card>
  );
};