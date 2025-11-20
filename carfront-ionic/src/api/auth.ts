import { AUTH_URL } from '../constants/config';

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
}

const jsonHeaders = { 'Content-Type': 'application/json' };

const handleResponse = async (res: Response) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Kërkesa dështoi');
  }
  return data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  phone?: string,
): Promise<AuthResponse> => {
  const res = await fetch(`${AUTH_URL}/register`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ name, email, password, phone }),
  });
  return handleResponse(res);
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
};

export const fetchMe = async (token: string) => {
  const res = await fetch(`${AUTH_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await handleResponse(res);
  // getMe returns { user: {...} } to match register/login format
  return data.user;
};

