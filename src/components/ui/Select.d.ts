import React from 'react';
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: {
        value: string;
        label: string;
    }[];
    error?: string;
}
export declare const Select: React.FC<SelectProps>;
export {};
//# sourceMappingURL=Select.d.ts.map