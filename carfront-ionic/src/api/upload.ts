import { UPLOAD_URL } from '../constants/config';

const handleResponse = async (res: Response) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Ngarkimi dështoi');
  }
  return data;
};

export const uploadCarImage = async (token: string, file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${UPLOAD_URL}/car-image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return handleResponse(res);
};

