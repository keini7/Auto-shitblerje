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
import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Gabim", "Plotëso email dhe password.");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(email, password);

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
        Mirësevjen 👋
      </Text>

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

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        className="bg-blue-600 p-4 rounded-xl items-center"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-lg font-bold">Kyçu</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        className="mt-6"
      >
        <Text className="text-blue-400 text-center">
          Nuk ke llogari? Regjistrohu
        </Text>
      </TouchableOpacity>
    </View>
  );
}
