import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavoritesContext = createContext();

export const useFavoritesContext = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const stored = await AsyncStorage.getItem("favorites");
      if (stored) setFavorites(JSON.parse(stored));
    };
    loadFavorites();
  }, []);

  const saveFavorites = async (newList) => {
    setFavorites(newList);
    await AsyncStorage.setItem("favorites", JSON.stringify(newList));
  };

  const toggleFavorite = (car) => {
    const exists = favorites.some((f) => f._id === car._id);
    const updated = exists
      ? favorites.filter((f) => f._id !== car._id)
      : [...favorites, car];

    saveFavorites(updated);
  };

  const isFavorite = (id) => favorites.some((f) => f._id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
