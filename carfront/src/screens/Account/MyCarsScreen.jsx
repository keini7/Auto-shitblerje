import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { getMyCars, deleteCar } from "../../api/cars";
import CarCard from "../../components/CarCard";

export default function MyCarsScreen({ navigation }) {
  const { token } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMyCars = async () => {
    try {
      const data = await getMyCars(token);
      setCars(data);
    } catch (err) {
      console.log("Error loading my cars:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load on mount + when screen gains focus
  useEffect(() => {
    const unsub = navigation.addListener("focus", () => {
      setLoading(true);
      loadMyCars();
    });

    return unsub;
  }, [navigation, token]);

  const handleDelete = (id) => {
    Alert.alert(
      "Konfirmo",
      "Je i sigurt që do ta fshish këtë makinë?",
      [
        { text: "Anulo", style: "cancel" },
        {
          text: "Po, fshije",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCar(id, token);
              setCars((prev) => prev.filter((c) => c._id !== id));
            } catch (err) {
              console.log("Error deleting car:", err);
              Alert.alert("Gabim", "Nuk u fshi dot makina.");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#00aaff" />
        <Text className="text-white mt-3">Duke ngarkuar makinat e tua...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black p-4">
      <Text className="text-white text-2xl font-bold mb-4">
        Makinat e mia
      </Text>

      {cars.length === 0 ? (
        <Text className="text-gray-400">
          Nuk ke asnjë makinë të shtuar.
        </Text>
      ) : (
        <FlatList
          data={cars}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="mb-3">
              <CarCard car={item} navigation={navigation} />
              <TouchableOpacity
                onPress={() => handleDelete(item._id)}
                className="bg-red-600 p-2 rounded-xl mt-2"
              >
                <Text className="text-white text-center">Fshi makinën</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
