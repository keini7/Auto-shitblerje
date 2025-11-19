import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { getCarById, getRelatedCars } from "../../api/cars";
import CarCard from "../../components/CarCard";
import { BASE_URL } from "../../constants/config";

import { useFavoritesContext } from "../../context/FavoritesContext";

export default function CarDetailsScreen({ route, navigation }) {
  const { id } = route.params;

  const [car, setCar] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const { toggleFavorite, isFavorite } = useFavoritesContext();

  const loadCarData = async () => {
    try {
      const details = await getCarById(id);
      const suggestions = await getRelatedCars(id);

      setCar(details ?? null);
      setRelated(suggestions ?? []);
    } catch (err) {
      console.log("Error loading car:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadCarData();
  }, [id]);

  if (loading || !car) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#00aaff" />
        <Text className="text-gray-400 mt-3">Duke ngarkuar detajet...</Text>
      </View>
    );
  }

  const fav = isFavorite(car._id);

  return (
    <ScrollView className="flex-1 bg-black">

      {/* Photos */}
      {car.images?.length > 0 && (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          className="w-full h-72"
        >
          {car.images.map((img, index) => (
            <Image
              key={index}
              source={{ uri: `${BASE_URL}${img}` }}
              className="w-full h-72"
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      )}

      <View className="p-4">

        {/* Title + Favorites */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-white text-2xl font-bold flex-1 mr-3">
            {car.title}
          </Text>

          <TouchableOpacity onPress={() => toggleFavorite(car)}>
            <Ionicons
              name={fav ? "heart" : "heart-outline"}
              size={30}
              color={fav ? "#ff4b81" : "#ccc"}
            />
          </TouchableOpacity>
        </View>

        {/* BRAND + MODEL + YEAR */}
        <Text className="text-gray-400 text-lg">
          {car.brand} {car.model} • {car.year}
        </Text>

        {/* PRICE */}
        <Text className="text-blue-400 text-3xl font-bold mt-2 mb-4">
          {car.price} €
        </Text>

        {/* SPECIFICATIONS */}
        <View className="bg-gray-800 p-3 rounded-xl mb-4">
          <Text className="text-white">⛽ Fuel: {car.fuel}</Text>
          <Text className="text-white">⚙ Transmision: {car.transmission}</Text>
          <Text className="text-white">🚗 Body: {car.body_type}</Text>
          <Text className="text-white">📍 Location: {car.location}</Text>
          <Text className="text-white">🛣 Mileage: {car.mileage} km</Text>
          <Text className="text-white">
            📅 Posted: {new Date(car.createdAt ?? car.created_at).toLocaleDateString()}
          </Text>
        </View>

        {/* DESCRIPTION */}
        <View className="bg-gray-800 p-4 rounded-xl mb-5">
          <Text className="text-white text-lg font-bold mb-2">Përshkrimi</Text>
          <Text className="text-gray-300 leading-6">
            {car.description || "Nuk ka përshkrim."}
          </Text>
        </View>

        {/* SELLER INFORMATION */}
        <View className="bg-gray-900 p-4 rounded-xl mb-6">
          <Text className="text-white text-lg font-bold mb-2">Shitësi</Text>

          <Text className="text-gray-300">👤 {car.seller?.name}</Text>
          <Text className="text-gray-300">📧 {car.seller?.email}</Text>
          <Text className="text-gray-300 mb-3">📞 {car.seller?.phone}</Text>

          <TouchableOpacity
            className="bg-blue-600 p-3 rounded-xl"
            onPress={() =>
              Linking.openURL(
                Platform.OS === "ios"
                  ? `telprompt:${car.seller?.phone}`
                  : `tel:${car.seller?.phone}`
              )
            }
          >
            <Text className="text-white text-center text-lg">📞 Kontakto</Text>
          </TouchableOpacity>
        </View>

        {/* RELATED */}
        <Text className="text-white text-xl font-bold mb-3">
          Të ngjashme
        </Text>

        {related.length === 0 ? (
          <Text className="text-gray-500 mb-10">
            Nuk ka makina të ngjashme.
          </Text>
        ) : (
          related.map((item) => (
            <CarCard key={item._id} car={item} navigation={navigation} />
          ))
        )}
      </View>
    </ScrollView>
  );
}
