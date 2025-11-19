import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_URL } from "../constants/config";

export const AuthContext = createContext(); // 👉 duhet eksportuar

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= AUTO LOGIN =================
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        const savedUser = await AsyncStorage.getItem("user");

        if (savedToken) {
          setToken(savedToken);

          if (savedUser) setUser(JSON.parse(savedUser));

          // Fresh user from backend
          try {
            const res = await fetch(`${AUTH_URL}/me`, {
              headers: { Authorization: `Bearer ${savedToken}` },
            });

            if (res.ok) {
              const freshUser = await res.json();
              setUser(freshUser);
              await AsyncStorage.setItem("user", JSON.stringify(freshUser));
            } else {
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
        isLogged: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
