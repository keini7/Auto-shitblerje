import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCarById } from "../../api/cars";
import CarCard from "../../components/CarCard";

export default function FavoritesScreen({ navigation }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      setCars([]);

      const stored = await AsyncStorage.getItem("favorites");
      const favoriteIds = stored ? JSON.parse(stored) : [];

      if (favoriteIds.length === 0) {
        setCars([]);
        setLoading(false);
        return;
      }

      // LOAD ALL FAVORITES MUCH FASTER
      const results = await Promise.all(
        favoriteIds.map(async (id) => {
          try {
            return await getCarById(id);
          } catch (err) {
            console.log("Car not found:", id);
            return null;
          }
        })
      );

      // remove null (cars not found)
      setCars(results.filter((c) => c !== null));
    } catch (err) {
      console.log("Error loading favorites:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reload favorites when screen opens
  useEffect(() => {
    const unsub = navigation.addListener("focus", loadFavorites);
    return unsub;
  }, [navigation, loadFavorites]);

  if (loading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#00aaff" />
        <Text className="text-gray-400 mt-3">Duke ngarkuar favorites...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black p-4">
      <Text className="text-white text-2xl font-bold mb-4">Të preferuarat</Text>

      {cars.length === 0 ? (
        <Text className="text-gray-400 text-lg">
          Nuk ke asnjë makinë të ruajtur në favorites.
        </Text>
      ) : (
        cars.map((car) => (
          <CarCard key={car._id} car={car} navigation={navigation} />
        ))
      )}
    </ScrollView>
  );
}
