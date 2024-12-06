import React from 'react';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
}
export declare const Modal: React.FC<ModalProps>;
export {};
//# sourceMappingURL=Modal.d.ts.map