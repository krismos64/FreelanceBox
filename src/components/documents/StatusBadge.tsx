import React from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Document } from "../../types";

interface StatusBadgeProps {
  status: Document["status"];
  onStatusChange?: (newStatus: Document["status"]) => void;
  type: "quote" | "invoice";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  onStatusChange,
  type,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const getAvailableStatuses = () => {
    const baseStatuses: Document["status"][] = [
      "Généré",
      "Envoyé",
      "Accepté",
      "Rejeté",
    ];
    return type === "invoice" ? [...baseStatuses, "Payé"] : baseStatuses;
  };

  if (!onStatusChange) {
    return <Badge status={status}>{status}</Badge>;
  }

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>
        <Badge status={status} className="cursor-pointer">
          {status}
        </Badge>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {getAvailableStatuses().map((newStatus) => (
              <Button
                key={newStatus}
                variant="secondary"
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  onStatusChange(
                    newStatus as
                      | "Généré"
                      | "Envoyé"
                      | "Accepté"
                      | "Rejeté"
                      | "Payé"
                  );
                  setIsOpen(false);
                }}
              >
                {newStatus}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
