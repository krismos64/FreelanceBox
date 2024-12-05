import React from "react";
import { Select } from "../ui/Select";
import { SearchInput } from "../ui/SearchInput";

interface DocumentFiltersProps {
  onStatusChange: (status: string) => void;
  onSearch: (value: string) => void;
  onDateSort: (direction: "asc" | "desc") => void;
  type: string; // Si vous souhaitez accepter toutes les valeurs possibles.
}

export const DocumentFilters: React.FC<DocumentFiltersProps> = ({
  onStatusChange,
  onSearch,
  onDateSort,
  type,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <SearchInput onSearch={onSearch} />

      <Select
        label=""
        options={[
          { value: "all", label: "Tous les statuts" },
          { value: "Généré", label: "Généré" },
          { value: "Envoyé", label: "Envoyé" },
          { value: "Accepté", label: "Accepté" },
          { value: "Rejeté", label: "Rejeté" },
          ...(type === "invoice" ? [{ value: "Payé", label: "Payé" }] : []),
        ]}
        onChange={(e) => onStatusChange(e.target.value)}
      />

      <Select
        label=""
        options={[
          { value: "desc", label: "Plus récent d'abord" },
          { value: "asc", label: "Plus ancien d'abord" },
        ]}
        onChange={(e) => onDateSort(e.target.value as "asc" | "desc")}
      />
    </div>
  );
};
