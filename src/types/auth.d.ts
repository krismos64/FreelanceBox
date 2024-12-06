import { z } from 'zod';
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const registerSchema: z.ZodEffects<z.ZodObject<z.objectUtil.extendShape<{
    email: z.ZodString;
    password: z.ZodString;
}, {
    name: z.ZodString;
    confirmPassword: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}, {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}>, {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}, {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}
export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}
//# sourceMappingURL=auth.d.ts.map