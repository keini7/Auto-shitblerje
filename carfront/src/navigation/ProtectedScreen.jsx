import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function ProtectedScreen({ children, navigation }) {
  const { isLogged } = useAuth();

  if (!isLogged) {
    return (
      <View className="flex-1 bg-black items-center justify-center p-6">
        <Text className="text-white text-xl font-bold mb-3 text-center">
          Duhet të jeni i loguar
        </Text>

        <Text className="text-gray-400 text-center mb-6">
          Kjo faqe është e disponueshme vetëm për përdoruesit e loguar.
        </Text>

        <TouchableOpacity
          className="bg-blue-600 px-6 py-3 rounded-xl"
          onPress={() => navigation.navigate("AccountTab", { screen: "Login" })}
        >
          <Text className="text-white text-lg">Shko tek Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <>{children}</>;
}
