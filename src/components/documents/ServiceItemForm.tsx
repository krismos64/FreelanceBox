import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ServiceItem } from '../../types';
import { Trash2 } from 'lucide-react';

interface ServiceItemFormProps {
  item: ServiceItem;
  onChange: (item: ServiceItem) => void;
  onDelete: () => void;
}

export const ServiceItemForm: React.FC<ServiceItemFormProps> = ({
  item,
  onChange,
  onDelete,
}) => {
  const handleChange = (field: keyof ServiceItem, value: string | number) => {
    const newItem = { ...item };
    
    if (field === 'quantity' || field === 'unitPrice') {
      // Convertir en nombre et utiliser 0 si la valeur n'est pas valide
      const numValue = parseFloat(value.toString()) || 0;
      newItem[field] = numValue;
      newItem.total = newItem.quantity * newItem.unitPrice;
    } else {
      newItem[field] = value;
    }
    
    onChange(newItem);
  };

  return (
    <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg">
      <div className="flex-grow">
        <Input
          label="Description"
          value={item.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>
      <div className="w-32">
        <Input
          label="Quantité"
          type="number"
          min="1"
          step="1"
          value={item.quantity.toString()}
          onChange={(e) => handleChange('quantity', e.target.value)}
        />
      </div>
      <div className="w-32">
        <Input
          label="Prix unitaire"
          type="number"
          step="0.01"
          min="0"
          value={item.unitPrice.toString()}
          onChange={(e) => handleChange('unitPrice', e.target.value)}
        />
      </div>
      <div className="w-32 pt-7">
        <p className="text-right font-medium">{item.total.toFixed(2)} €</p>
      </div>
      <Button
        type="button"
        variant="danger"
        size="sm"
        className="mt-7"
        onClick={onDelete}
      >
        <Trash2 size={16} />
      </Button>
    </div>
  );
};