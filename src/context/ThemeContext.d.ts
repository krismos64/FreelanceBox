import React from "react";
export interface ThemeContextType {
    theme: "light" | "dark";
    toggleTheme: () => void;
}
export declare const ThemeProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useTheme: () => ThemeContextType;
//# sourceMappingURL=ThemeContext.d.ts.map