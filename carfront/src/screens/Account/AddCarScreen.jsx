import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useAuth } from "../../context/AuthContext";
import { uploadCarImage, createCar } from "../../api/cars";
import { BASE_URL } from "../../constants/config";

export default function AddCarScreen({ navigation }) {
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setTitle("");
    setBrand("");
    setModel("");
    setYear("");
    setPrice("");
    setMileage("");
    setFuel("");
    setTransmission("");
    setBodyType("");
    setLocation("");
    setDescription("");
    setImages([]);
  };

  const pickImage = async () => {
    if (!token) {
      Alert.alert("Gabim", "Duhet të jesh i loguar për të ngarkuar foto.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      try {
        setLoading(true);

        const localUri =
          Platform.OS === "web"
            ? result.assets[0].uri
            : result.assets[0].uri.replace("file://", "");

        const uploaded = await uploadCarImage(token, localUri);

        setImages((prev) => [...prev, uploaded.url]);
      } catch (err) {
        console.log("Error uploading image:", err);
        Alert.alert("Gabim", "Ngarkimi i fotos dështoi.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!title || !fuel || images.length === 0) {
      Alert.alert(
        "Gabim",
        "Titulli, karburanti dhe të paktën 1 foto janë të detyrueshme."
      );
      return;
    }

    if (year && isNaN(Number(year))) {
      Alert.alert("Gabim", "Viti duhet të jetë numër.");
      return;
    }

    if (price && isNaN(Number(price))) {
      Alert.alert("Gabim", "Çmimi duhet të jetë numër.");
      return;
    }

    const carData = {
      title,
      brand,
      model,
      year: year ? Number(year) : undefined,
      price: price ? Number(price) : undefined,
      mileage: mileage ? Number(mileage) : undefined,
      fuel,
      transmission,
      body_type: bodyType,
      location,
      description,
      images,
    };

    // pastrim i fushave bosh
    const cleanData = Object.fromEntries(
      Object.entries(carData).filter(([_, v]) => v !== "" && v !== undefined)
    );

    try {
      setLoading(true);
      await createCar(token, cleanData);

      Alert.alert("Sukses", "Makina u shtua me sukses!");

      resetForm();

      navigation.navigate("MyCars");
    } catch (err) {
      console.log("Error creating car:", err);
      Alert.alert("Gabim", err.message || "Nuk u shtua dot makina.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-black p-4">
      <Text className="text-white text-2xl font-bold mb-4">
        Shto një makinë për shitje
      </Text>

      {/* ====== INPUTET ====== */}
      <Text className="text-white mb-2">Titulli *</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        className="bg-gray-900 text-white p-3 rounded-xl mb-3"
        placeholder="Titulli i njoftimit"
        placeholderTextColor="#666"
      />

      <Text className="text-white mb-2">Marka</Text>
      <TextInput
        value={brand}
        onChangeText={setBrand}
        className="bg-gray-900 text-white p-3 rounded-xl mb-3"
        placeholder="Audi, BMW..."
        placeholderTextColor="#666"
      />

      <Text className="text-white mb-2">Modeli</Text>
      <TextInput
        value={model}
        onChangeText={setModel}
        className="bg-gray-900 text-white p-3 rounded-xl mb-3"
        placeholder="A4, Golf 7..."
        placeholderTextColor="#666"
      />

      <Text className="text-white mb-2">Viti</Text>
      <TextInput
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
        className="bg-gray-900 text-white p-3 rounded-xl mb-3"
        placeholder="2017"
        placeholderTextColor="#666"
      />

      <Text className="text-white mb-2">Çmimi (€)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        className="bg-gray-900 text-white p-3 rounded-xl mb-3"
        placeholder="10000"
        placeholderTextColor="#666"
      />

      <Text className="text-white mb-2">Kilometra</Text>
      <TextInput
        value={mileage}
        onChangeText={setMileage}
        keyboardType="numeric"
        className="bg-gray-900 text-white p-3 rounded-xl mb-3"
        placeholder="150000"
        placeholderTextColor="#666"
      />

      <Text className="text-white mb-2">Karburanti *</Text>
      <TextInput
        value={fuel}
        onChangeText={setFuel}
        className="bg-gray-900 text-white p-3 rounded-xl mb-3"
        placeholder="Naftë, Benzinë..."
        placeholderTextColor="#666"
      />

      <Text className="text-white mb-2">Transmisioni</Text>
      <TextInput
        value={transmission}
        onChangeText={setTransmission}
        className="bg-gray-900 text-white p-3 rounded-xl mb-3"
        placeholder="Automatik / Manual"
        placeholderTextColor="#666"
      />

      <Text className="text-white mb-2">Lloji karrocerisë</Text>
      <TextInput
        value={bodyType}
        onChangeText={setBodyType}
        className="bg-gray-900 text-white p-3 rounded-xl mb-3"
        placeholder="Sedan, SUV..."
        placeholderTextColor="#666"
      />

      <Text className="text-white mb-2">Vendndodhja</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        className="bg-gray-900 text-white p-3 rounded-xl mb-3"
        placeholder="Tiranë, Durrës..."
        placeholderTextColor="#666"
      />

      <Text className="text-white mb-2">Përshkrimi</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        multiline
        className="bg-gray-900 text-white p-3 rounded-xl mb-3 h-24"
        placeholder="Detaje të tjera..."
        placeholderTextColor="#666"
      />

      {/* ================= FOTO ================= */}
      <Text className="text-white mb-2 mt-2">Fotot *</Text>
      <View className="flex-row flex-wrap mb-3">
        {images.map((img, idx) => (
          <Image
            key={idx}
            source={{ uri: `${BASE_URL}${img}` }}
            className="w-24 h-24 rounded-xl mr-2 mb-2"
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={pickImage}
        className="bg-gray-700 p-3 rounded-xl mb-4"
        disabled={loading}
      >
        <Text className="text-white text-center">
          {loading ? "Duke ngarkuar foto..." : "Shto foto"}
        </Text>
      </TouchableOpacity>

      {/* SUBMIT */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-600 p-3 rounded-xl mb-10"
        disabled={loading}
      >
        <Text className="text-white text-center text-lg font-bold">
          {loading ? "Duke ruajtur..." : "Ruaj makinën"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
