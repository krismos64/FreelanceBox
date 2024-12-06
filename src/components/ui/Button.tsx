import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

interface ButtonPropsWithClassName extends ButtonProps {
  className?: string;
}

export const Button: React.FC<ButtonPropsWithClassName> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonPropsWithClassName) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-transform transform-gpu duration-200";

  const variantStyles: Record<string, string> = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  const sizeStyles: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onMouseDown={(e) => e.currentTarget.classList.add("scale-95")}
      onMouseUp={(e) => e.currentTarget.classList.remove("scale-95")}
      onMouseLeave={(e) => e.currentTarget.classList.remove("scale-95")}
      {...props}
    >
      {children}
    </button>
  );
};
