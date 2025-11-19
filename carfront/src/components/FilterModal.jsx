import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getBrands, getModels } from "../api/cars";

export default function FilterModal({ visible, onClose, onApply }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");

  const reset = () => {
    setBrand("");
    setModel("");
    setMinPrice("");
    setMaxPrice("");
    setMinYear("");
    setMaxYear("");
  };

  useEffect(() => {
    if (!visible) return;

    (async () => {
      const b = await getBrands();
      setBrands(b);
    })();
  }, [visible]);

  useEffect(() => {
    if (!brand) return setModels([]);

    (async () => {
      const m = await getModels(brand);
      setModels(m);
    })();
  }, [brand]);

  const apply = () => {
    onApply({
      brand,
      model,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/70 justify-end">
        <View className="bg-gray-900 p-5 rounded-t-3xl h-[75%]">

          {/* HEADER */}
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-white text-xl font-bold">Filtër</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={26} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView>

            {/* BRAND */}
            <Text className="text-white mb-1">Marka</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              {brands.map((b) => (
                <TouchableOpacity
                  key={b}
                  onPress={() => setBrand(brand === b ? "" : b)}
                  className={`px-4 py-2 rounded-xl mr-2 ${
                    brand === b ? "bg-blue-600" : "bg-gray-700"
                  }`}
                >
                  <Text className="text-white">{b}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* MODEL */}
            {models.length > 0 && (
              <>
                <Text className="text-white mb-1">Modeli</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                  {models.map((m) => (
                    <TouchableOpacity
                      key={m}
                      onPress={() => setModel(model === m ? "" : m)}
                      className={`px-4 py-2 rounded-xl mr-2 ${
                        model === m ? "bg-blue-600" : "bg-gray-700"
                      }`}
                    >
                      <Text className="text-white">{m}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}

            {/* PRICE */}
            <Text className="text-white mb-2">Çmimi (€)</Text>
            <View className="flex-row mb-5">
              <TextInput
                placeholder="Min"
                placeholderTextColor="#777"
                keyboardType="numeric"
                value={minPrice}
                onChangeText={setMinPrice}
                className="flex-1 bg-gray-800 text-white p-3 rounded-xl mr-2"
              />
              <TextInput
                placeholder="Max"
                placeholderTextColor="#777"
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={setMaxPrice}
                className="flex-1 bg-gray-800 text-white p-3 rounded-xl"
              />
            </View>

            {/* YEAR */}
            <Text className="text-white mb-2">Viti</Text>
            <View className="flex-row mb-8">
              <TextInput
                placeholder="Min"
                placeholderTextColor="#777"
                keyboardType="numeric"
                value={minYear}
                onChangeText={setMinYear}
                className="flex-1 bg-gray-800 text-white p-3 rounded-xl mr-2"
              />
              <TextInput
                placeholder="Max"
                placeholderTextColor="#777"
                keyboardType="numeric"
                value={maxYear}
                onChangeText={setMaxYear}
                className="flex-1 bg-gray-800 text-white p-3 rounded-xl"
              />
            </View>

          </ScrollView>

          {/* BUTTONS */}
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={reset}
              className="bg-gray-700 px-4 py-3 rounded-xl flex-1 mr-3"
            >
              <Text className="text-white text-center font-bold">Reseto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={apply}
              className="bg-blue-600 px-4 py-3 rounded-xl flex-1"
            >
              <Text className="text-white text-center font-bold">Apliko</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}
