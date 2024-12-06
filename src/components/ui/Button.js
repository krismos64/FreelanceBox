import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({ variant = "primary", size = "md", className = "", children, ...props }) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-transform transform-gpu duration-200";
    const variantStyles = {
        primary: "bg-blue-500 hover:bg-blue-600 text-white",
        secondary: "bg-gray-500 hover:bg-gray-600 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
    };
    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };
    return (_jsx("button", { className: `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`, onMouseDown: (e) => e.currentTarget.classList.add("scale-95"), onMouseUp: (e) => e.currentTarget.classList.remove("scale-95"), onMouseLeave: (e) => e.currentTarget.classList.remove("scale-95"), ...props, children: children }));
};
