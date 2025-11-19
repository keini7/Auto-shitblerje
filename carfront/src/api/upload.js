import { UPLOAD_URL } from "../constants/config";

export const uploadCarImage = async (token, uri) => {
  const formData = new FormData();
  formData.append("image", {
    uri,
    name: "car.jpg",
    type: "image/jpeg",
  });

  const res = await fetch(`${UPLOAD_URL}/car-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error uploading image");
  return data;
};
