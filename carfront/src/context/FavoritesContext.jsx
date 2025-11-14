import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesContext = createContext();

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

  const saveFavorites = async (items) => {
    setFavorites(items);
    await AsyncStorage.setItem("favorites", JSON.stringify(items));
  };

  const toggleFavorite = (car) => {
    let updated;
    if (favorites.some((f) => f._id === car._id)) {
      updated = favorites.filter((f) => f._id !== car._id);
    } else {
      updated = [...favorites, car];
    }
    saveFavorites(updated);
  };

  const isFavorite = (id) => favorites.some((f) => f._id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
