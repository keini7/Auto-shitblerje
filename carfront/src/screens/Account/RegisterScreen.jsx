import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { registerUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

export default function RegisterScreen({ navigation }) {
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Gabim", "Plotëso emër, email dhe password.");
      return;
    }

    try {
      setLoading(true);
      const data = await registerUser(name, email, password, phone);

      await login(
        {
          _id: data._id,
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
        data.token
      );

      navigation.replace("AccountHome");
    } catch (err) {
      Alert.alert("Gabim", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-black p-6 justify-center">

      <Text className="text-white text-4xl font-bold mb-8">
        Krijo llogari ✨
      </Text>

      {/* NAME */}
      <View className="bg-gray-900 p-4 rounded-xl flex-row items-center mb-4">
        <Ionicons name="person" size={22} color="#888" />
        <TextInput
          placeholder="Emër"
          placeholderTextColor="#666"
          value={name}
          onChangeText={setName}
          className="text-white flex-1 ml-3"
        />
      </View>

      {/* EMAIL */}
      <View className="bg-gray-900 p-4 rounded-xl flex-row items-center mb-4">
        <Ionicons name="mail" size={22} color="#888" />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          className="text-white flex-1 ml-3"
        />
      </View>

      {/* PHONE */}
      <View className="bg-gray-900 p-4 rounded-xl flex-row items-center mb-4">
        <Ionicons name="call" size={22} color="#888" />
        <TextInput
          placeholder="Telefon (opsionale)"
          placeholderTextColor="#666"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          className="text-white flex-1 ml-3"
        />
      </View>

      {/* PASSWORD */}
      <View className="bg-gray-900 p-4 rounded-xl flex-row items-center mb-6">
        <Ionicons name="lock-closed" size={22} color="#888" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry={!showPass}
          value={password}
          onChangeText={setPassword}
          className="text-white flex-1 ml-3"
        />
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <Ionicons
            name={showPass ? "eye-off" : "eye"}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* REGISTER BUTTON */}
      <TouchableOpacity
        onPress={handleRegister}
        disabled={loading}
        className="bg-blue-600 p-4 rounded-xl items-center"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-lg font-bold">Regjistrohu</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="mt-6"
      >
        <Text className="text-blue-400 text-center">
          Ke llogari? Kyçu
        </Text>
      </TouchableOpacity>
    </View>
  );
}
