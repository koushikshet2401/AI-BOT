import {
  userLogin,
  getAuthStatus,
  logoutUser,
  userSignup,
} from "../../helpers/api-functions";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // ⭐ important

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getAuthStatus();

        if (data?.email) {
          setUser(data);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.log("Not authenticated");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const data = await userLogin(email, password);
    if (data) {
      setUser(data);
      setIsLoggedIn(true);
    }
  };

  const signup = async (name, email, password) => {
    const data = await userSignup(name, email, password);
    if (data) {
      setUser(data);
      setIsLoggedIn(true);
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };

  // ⭐ Prevent app from rendering before auth check
  if (loading) return <div />;


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
