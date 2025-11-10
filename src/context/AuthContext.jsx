import { createContext, useContext, useState, useEffect } from "react";
import facade from "../util/apiFacade";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(facade.loggedIn());
  const [username, setUsername] = useState(facade.getUsername());

  const login = async (user, pass) => {
    await facade.login(user, pass);
    setIsLoggedIn(true);
    setUsername(facade.getUsername());
  };

  const logout = () => {
    facade.logout();
    setIsLoggedIn(false);
    setUsername("");
  };

  // Check token on mount
  useEffect(() => {
    if (facade.loggedIn()) {
      const token = facade.getToken();
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        logout();
      } else {
        setIsLoggedIn(true);
        setUsername(facade.getUsername());
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// --- Helper to decode and check token expiry ---
function isTokenExpired(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return true; // Treat as expired if decoding fails
  }
}
