import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useFavoritesContext } from "../context/FavoritesContext";
import { API_URL } from "../constants/config";

export default function CarCard({ car, navigation: navProp }) {
  const navigation = navProp || useNavigation();
  const { toggleFavorite, isFavorite } = useFavoritesContext();

  const fav = isFavorite(car._id);

  return (
    <TouchableOpacity
      className="bg-gray-900 p-4 rounded-xl mb-4"
      activeOpacity={0.9}
      onPress={() => navigation.navigate("CarDetails", { id: car._id })}
    >
      {car.images?.length > 0 && (
        <Image
          source={{ uri: `${API_URL}${car.images[0]}` }}
          className="w-full h-48 rounded-xl mb-3"
        />
      )}

      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-white text-lg font-bold flex-1 mr-2">
          {car.title}
        </Text>

        <TouchableOpacity onPress={() => toggleFavorite(car)}>
          <Ionicons
            name={fav ? "heart" : "heart-outline"}
            size={22}
            color={fav ? "#ff4b81" : "#ccc"}
          />
        </TouchableOpacity>
      </View>

      <Text className="text-gray-400">
        {car.brand} {car.model} • {car.year}
      </Text>

      <Text className="text-blue-400 text-lg font-bold mt-2">
        {car.price} €
      </Text>

      {car.location && (
        <Text className="text-gray-500 mt-1">📍 {car.location}</Text>
      )}
    </TouchableOpacity>
  );
}
