import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SortModal({ visible, onClose, sort, onSelect }) {
  const options = [
    { label: "Më të rejat", value: "latest" },
    { label: "Çmimi ↑", value: "price_asc" },
    { label: "Çmimi ↓", value: "price_desc" },
    { label: "Viti ↑", value: "year_asc" },
    { label: "Viti ↓", value: "year_desc" },
    { label: "Kilometra ↑", value: "km_asc" },
    { label: "Kilometra ↓", value: "km_desc" },
  ];

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View className="flex-1 bg-black/70 justify-end">
        <View className="bg-gray-900 p-6 rounded-t-3xl">

          {/* HEADER */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-xl font-bold">Rendit sipas</Text>

            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={26} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* OPTIONS */}
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              onPress={() => onSelect(opt.value)}
              className={`p-4 rounded-xl mb-2 ${
                sort === opt.value ? "bg-blue-600" : "bg-gray-800"
              }`}
            >
              <Text className="text-white text-lg">{opt.label}</Text>
            </TouchableOpacity>
          ))}

        </View>
      </View>
    </Modal>
  );
}
