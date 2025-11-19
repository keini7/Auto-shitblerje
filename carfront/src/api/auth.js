import { AUTH_URL } from "../constants/config";

// ================= REGISTER =================
export const registerUser = async (name, email, password, phone) => {
  const res = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, phone }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data; // {_id, name, email, phone, token}
};

// ================= LOGIN =================
export const loginUser = async (email, password) => {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data; // {_id, name, email, phone, token}
};
