const BASE_URL = "http://192.168.1.216:8000/api";

// ================= LIST ALL CARS =================
export const getCars = async (page = 1, limit = 20) => {
  const res = await fetch(`${BASE_URL}/cars?page=${page}&limit=${limit}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error loading cars");
  }
  return data; // { total, page, pages, cars }
};

// ================= GET CAR BY ID =================
export const getCarById = async (id) => {
  const res = await fetch(`${BASE_URL}/cars/${id}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error loading car");
  }
  return data;
};

// ================= RELATED CARS =================
export const getRelatedCars = async (id) => {
  const res = await fetch(`${BASE_URL}/cars/${id}/related`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error loading related cars");
  }
  return data;
};

// ================= CREATE CAR (requires token) =================
export const createCar = async (token, carData) => {
  const res = await fetch(`${BASE_URL}/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(carData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error creating car");
  }
  return data;
};

// ================= GET MY CARS =================
export const getMyCars = async (token) => {
  const res = await fetch(`${BASE_URL}/cars/me/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error loading my cars");
  }
  return data; // array of cars
};

// ================= DELETE CAR =================
export const deleteCar = async (id, token) => {
  const res = await fetch(`${BASE_URL}/cars/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error deleting car");
  }
  return data;
};
