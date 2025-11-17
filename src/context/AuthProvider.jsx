import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import facade from "../util/apiFacade.js";

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

  useEffect(() => {
    if (facade.loggedIn()) {
      const token = facade.getToken();
      if (isTokenExpired(token)) logout();
      else {
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

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp < Math.floor(Date.now() / 1000);
  } catch {
    return true;
  }
}
