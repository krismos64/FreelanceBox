import { LoginFormData, RegisterFormData } from '../types/auth';
export declare const useAuthService: () => {
    handleLogin: (data: LoginFormData) => Promise<void>;
    handleRegister: (data: RegisterFormData) => Promise<void>;
    handleLogout: () => void;
};
//# sourceMappingURL=useAuth.d.ts.map