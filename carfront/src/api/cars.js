import { API_URL } from "../constants/config";

// =============== LIST ALL CARS =================
export const getCars = async (page = 1, limit = 20) => {
  const res = await fetch(`${API_URL}/cars?page=${page}&limit=${limit}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error loading cars");
  return data;
};

// =============== GET CAR BY ID =================
export const getCarById = async (id) => {
  const res = await fetch(`${API_URL}/cars/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error loading car");
  return data;
};

// =============== RELATED CARS =================
export const getRelatedCars = async (id) => {
  const res = await fetch(`${API_URL}/cars/${id}/related`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error loading related cars");
  return data;
};

// =============== GET BRANDS =================
export const getBrands = async () => {
  const res = await fetch(`${API_URL}/cars/brands`);
  const data = await res.json();
  if (!res.ok) throw new Error("Error loading brands");
  return data; // array
};

// =============== GET MODELS =================
export const getModels = async (brand) => {
  const res = await fetch(`${API_URL}/cars/models/${brand}`);
  const data = await res.json();
  if (!res.ok) throw new Error("Error loading models");
  return data; // array
};

// =============== CREATE CAR =================
export const createCar = async (token, carData) => {
  const res = await fetch(`${API_URL}/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(carData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error creating car");
  return data;
};

// =============== GET MY CARS =================
export const getMyCars = async (token) => {
  const res = await fetch(`${API_URL}/cars/me/mine`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Error loading my cars");
  return data;
};

// =============== DELETE CAR =================
export const deleteCar = async (id, token) => {
  const res = await fetch(`${API_URL}/cars/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Error deleting car");
  return data;
};
