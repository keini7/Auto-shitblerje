import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "../../context/AuthContext";
import { useFavoritesContext } from "../../context/FavoritesContext";

import { getMyCars } from "../../api/cars";

export default function AccountHome({ navigation }) {
  const { user, logout, token } = useAuth();
  const { favorites } = useFavoritesContext();

  const [myCarsCount, setMyCarsCount] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  const loadStats = async () => {
    if (!token) return;

    try {
      const cars = await getMyCars(token);
      setMyCarsCount(cars.length);
    } catch (err) {
      console.log("Error loading my cars:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  // Run on screen focus
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoadingStats(true);
      loadStats();
    });

    return () => unsubscribe();
  }, [navigation, token]);

  if (!user) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#00aaff" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black p-4">

      <Text className="text-white text-3xl font-bold mb-5">Profili im</Text>

      {/* User Info */}
      <View className="bg-gray-900 p-4 rounded-xl mb-6">
        <Text className="text-white text-xl font-bold">{user.name}</Text>
        <Text className="text-gray-300 mt-1">📧 {user.email}</Text>
        <Text className="text-gray-300 mt-1">📞 {user.phone || "Pa numër telefoni"}</Text>
      </View>

      {/* Stats */}
      <View className="flex-row justify-between mb-6">
        <View className="bg-gray-800 p-4 rounded-xl flex-1 mr-3 items-center">
          <Text className="text-blue-400 text-3xl font-bold">
            {loadingStats ? "…" : myCarsCount}
          </Text>
          <Text className="text-gray-300 mt-1">Makinat e mia</Text>
        </View>

        <View className="bg-gray-800 p-4 rounded-xl flex-1 ml-3 items-center">
          <Text className="text-pink-400 text-3xl font-bold">
            {favorites.length}
          </Text>
          <Text className="text-gray-300 mt-1">Të preferuarat</Text>
        </View>
      </View>

      {/* Buttons */}
      <TouchableOpacity
        onPress={() => navigation.navigate("AddCar")}
        className="bg-blue-600 p-4 rounded-xl flex-row items-center mb-3"
      >
        <Ionicons name="add-circle" size={26} color="white" />
        <Text className="text-white text-lg font-bold ml-3">
          Shto makinë
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("MyCars")}
        className="bg-gray-700 p-4 rounded-xl flex-row items-center mb-3"
      >
        <Ionicons name="car" size={26} color="white" />
        <Text className="text-white text-lg font-bold ml-3">
          Shiko makinat e mia
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Main", { screen: "FavoritesTab" })}
        className="bg-gray-700 p-4 rounded-xl flex-row items-center mb-3"
      >
        <Ionicons name="heart" size={26} color="white" />
        <Text className="text-white text-lg font-bold ml-3">
          Të preferuarat
        </Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        onPress={logout}
        className="bg-red-600 p-4 rounded-xl flex-row items-center mt-8"
      >
        <Ionicons name="log-out" size={26} color="white" />
        <Text className="text-white text-lg font-bold ml-3">
          Dil nga llogaria
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
