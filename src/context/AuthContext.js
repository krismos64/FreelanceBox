import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useReducer, useEffect } from 'react';
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
};
const AuthContext = createContext({
    state: initialState,
    dispatch: () => null,
});
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            dispatch({
                type: 'LOGIN',
                payload: { token, user: JSON.parse(user) },
            });
        }
    }, []);
    return (_jsx(AuthContext.Provider, { value: { state, dispatch }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
