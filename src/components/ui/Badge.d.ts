import React from 'react';
interface BadgeProps {
    status: 'Généré' | 'Envoyé' | 'Accepté' | 'Rejeté' | 'Payé';
    children: React.ReactNode;
    className?: string;
}
export declare const Badge: React.FC<BadgeProps>;
export {};
//# sourceMappingURL=Badge.d.ts.map