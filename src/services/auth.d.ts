import { LoginFormData, RegisterFormData } from "../types/auth";
export declare const login: (data: LoginFormData) => Promise<any>;
export declare const register: (data: RegisterFormData) => Promise<any>;
export declare const getCurrentUser: (token: string) => Promise<any>;
export declare const setupAxiosInterceptors: (token: string | null) => void;
//# sourceMappingURL=auth.d.ts.map