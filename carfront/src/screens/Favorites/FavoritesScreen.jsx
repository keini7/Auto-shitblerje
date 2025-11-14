import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCarById } from "../../api/cars";
import CarCard from "../../components/CarCard";

export default function FavoritesScreen({ navigation }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      const favoriteIds = stored ? JSON.parse(stored) : [];

      const loadedCars = [];

      // Merr objektet reale të makinave nga backend
      for (const id of favoriteIds) {
        try {
          const car = await getCarById(id);
          loadedCars.push(car);
        } catch (err) {
          console.log("Car not found:", id);
        }
      }

      setCars(loadedCars);
    } catch (err) {
      console.log("Error loading favorites:", err);
    }

    setLoading(false);
  };

  // Rifreskim sa herë hapim tab-in e favorites
  useEffect(() => {
    const unsub = navigation.addListener("focus", loadFavorites);
    return unsub;
  }, [navigation]);

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
      <Text className="text-white text-2xl font-bold mb-4">
        Të preferuarat
      </Text>

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
