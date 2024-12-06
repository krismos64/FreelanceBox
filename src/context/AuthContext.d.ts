import React from 'react';
import { AuthState, User } from '../types/auth';
type AuthAction = {
    type: 'LOGIN';
    payload: {
        user: User;
        token: string;
    };
} | {
    type: 'LOGOUT';
};
export declare const AuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useAuth: () => {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
};
export {};
//# sourceMappingURL=AuthContext.d.ts.map