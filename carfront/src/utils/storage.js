import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.log("Storage save error:", err);
    return false;
  }
};

export const getFromStorage = async (key) => {
  try {
    const val = await AsyncStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  } catch (err) {
    console.log("Storage read error:", err);
    return null;
  }
};

export const removeFromStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (err) {
    console.log("Storage remove error:", err);
    return false;
  }
};
