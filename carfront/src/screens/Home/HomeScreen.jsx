import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { getCars } from "../../api/cars";
import CarCard from "../../components/CarCard";

export default function HomeScreen({ navigation }) {
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Load cars from backend
  const loadCars = async () => {
    try {
      const data = await getCars(page);

      if (page === 1) {
        setCars(data.cars);
      } else {
        setCars((prev) => [...prev, ...data.cars]);
      }

      setLoading(false);
      setLoadingMore(false);
    } catch (error) {
      console.log("Error loading cars:", error);
    }
  };

  // First load + pagination
  useEffect(() => {
    loadCars();
  }, [page]);

  const loadMoreCars = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#00aaff" />
        <Text className="text-gray-400 mt-3">Duke ngarkuar makinat...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black p-4">
      <FlatList
        data={cars}
        renderItem={({ item }) => (
          <CarCard
            car={item}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item._id}
        onEndReached={loadMoreCars}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" color="#00aaff" />
          ) : null
        }
      />
    </View>
  );
}
