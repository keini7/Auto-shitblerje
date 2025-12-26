import { getApiBaseUrl } from '../constants/config';

export interface Car {
  _id: string;
  title: string;
  brand?: string;
  model?: string;
  year?: number;
  price?: number;
  mileage?: number;
  images?: string[];
  fuel?: string;
  transmission?: string;
  body_type?: string;
  location?: string;
  description?: string;
  seller?: {
    name: string;
    email: string;
    phone?: string;
  };
}

interface PaginatedCars {
  cars: Car[];
  total: number;
  page: number;
  pages: number;
}

const handleResponse = async (res: Response) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Kërkesa dështoi');
  }
  return data;
};

const buildQuery = (params: Record<string, string | number | undefined>) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
};

export const getCars = async (
  params: Record<string, string | number | undefined> = {},
): Promise<PaginatedCars> => {
  const query = buildQuery(params);
  const url = `${getApiBaseUrl()}/cars${query ? `?${query}` : ''}`;
  console.log('[API] Fetching cars from:', url);
  console.log('[API] API_BASE_URL:', getApiBaseUrl());
  const res = await fetch(url);
  console.log('[API] Response status:', res.status);
  return handleResponse(res);
};

export const searchCars = async (params: Record<string, string | number | undefined>) =>
  getCars(params);

export const getCarById = async (id: string): Promise<Car> => {
  const res = await fetch(`${getApiBaseUrl()}/cars/${id}`);
  return handleResponse(res);
};

export const getRelatedCars = async (id: string): Promise<Car[]> => {
  const res = await fetch(`${getApiBaseUrl()}/cars/${id}/related`);
  return handleResponse(res);
};

export const getBrands = async (): Promise<string[]> => {
  const res = await fetch(`${getApiBaseUrl()}/cars/brands`);
  return handleResponse(res);
};

export const getModels = async (brand: string): Promise<string[]> => {
  const res = await fetch(`${getApiBaseUrl()}/cars/models/${brand}`);
  return handleResponse(res);
};

export const createCar = async (token: string, carData: Record<string, unknown>) => {
  const res = await fetch(`${getApiBaseUrl()}/cars`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(carData),
  });
  return handleResponse(res);
};

export const getMyCars = async (token: string): Promise<Car[]> => {
  const res = await fetch(`${getApiBaseUrl()}/cars/me/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
};

export const deleteCar = async (id: string, token: string) => {
  const res = await fetch(`${getApiBaseUrl()}/cars/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
};

