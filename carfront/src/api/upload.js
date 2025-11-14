const BASE_URL = "http://192.168.1.216:8000/api";

// Upload car image (requires token)
// BE => POST /api/upload/car-image  (kthen { url: "/uploads/car-images/xxx.jpg" })
export const uploadCarImage = async (token, uri) => {
  const formData = new FormData();

  formData.append("image", {
    uri,
    name: "car.jpg",
    type: "image/jpeg",
  });

  const res = await fetch(`${BASE_URL}/upload/car-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // MOS vendos "Content-Type": multipart/... – leje RN ta vendos vetë
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error uploading image");
  }
  return data; // { url: "/uploads/car-images/xxx.jpg" }
};
