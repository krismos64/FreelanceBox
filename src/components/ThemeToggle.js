import { jsx as _jsx } from "react/jsx-runtime";
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/Button';
export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    return (_jsx(Button, { variant: "secondary", size: "sm", onClick: toggleTheme, className: "rounded-full w-10 h-10 p-0 flex items-center justify-center", title: `Activer le mode ${theme === 'light' ? 'sombre' : 'clair'}`, children: theme === 'light' ? _jsx(Moon, { size: 18 }) : _jsx(Sun, { size: 18 }) }));
};
