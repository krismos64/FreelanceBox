import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export const PrivateRoute = ({ children }) => {
  const { state } = useAuth();
  const location = useLocation();
  if (!state.isAuthenticated) {
    return _jsx(Navigate, {
      to: "/login",
      state: { from: location },
      replace: true,
    });
  }
  return _jsx(_Fragment, { children: children });
};
