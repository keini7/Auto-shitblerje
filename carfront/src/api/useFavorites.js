import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const stored = await AsyncStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  };

  // Check if car is favorite
  const isFavorite = (carId) => {
    return favorites.includes(carId);
  };

  const toggleFavorite = async (carId) => {
    let newFavs;

    if (favorites.includes(carId)) {
      newFavs = favorites.filter((id) => id !== carId);
    } else {
      newFavs = [...favorites, carId];
    }

    setFavorites(newFavs);
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavs));
  };

  return { favorites, toggleFavorite, isFavorite };
}
