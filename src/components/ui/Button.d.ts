import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
}
interface ButtonPropsWithClassName extends ButtonProps {
    className?: string;
}
export declare const Button: React.FC<ButtonPropsWithClassName>;
export {};
//# sourceMappingURL=Button.d.ts.map