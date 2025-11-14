import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // full user object
  const [token, setToken] = useState(null); // JWT
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://192.168.1.216:8000/api";

  // ================= AUTO LOGIN =================
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        const savedUser = await AsyncStorage.getItem("user");

        if (savedToken) {
          setToken(savedToken);

          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }

          // OPTIONAL: Marrja e përdoruesit të ri nga backend
          try {
            const res = await fetch(`${BASE_URL}/auth/me`, {
              headers: { Authorization: `Bearer ${savedToken}` },
            });

            if (res.ok) {
              const freshUser = await res.json();
              setUser(freshUser);
              await AsyncStorage.setItem("user", JSON.stringify(freshUser));
            } else {
              // Token invalid → logout
              await logout();
            }
          } catch (err) {
            console.log("Auth refresh error:", err);
          }
        }
      } catch (err) {
        console.log("Auth load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAuth();
  }, []);

  // ================= LOGIN =================
  const login = async (userData, tokenValue) => {
    setToken(tokenValue);
    setUser(userData);

    await AsyncStorage.setItem("token", tokenValue);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };

  // ================= LOGOUT =================
  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isLogged: !!token, // boolean i thjeshtë për ProtectedScreen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
