import { createContext, useContext, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "./useSessionStorage";
import { Token } from "../types";

const AuthContext = createContext({
  token: { access_token: "" },
  login: (token: Token) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useSessionStorage(
    "token",
    window.sessionStorage.getItem("token")
  );
  const navigate = useNavigate();

  const login = useCallback(
    (token: Token) => {
      setToken(token);
      navigate("/events");
    },
    [navigate, setToken]
  );

  const logout = useCallback(() => {
    setToken({ access_token: null });
    navigate("/signin", { replace: true });
  }, [navigate, setToken]);

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [login, logout, token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
