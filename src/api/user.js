export async function getTownHostInfo({ axiosInstance, townId }) {
  const response = await axiosInstance.get(`/users/${townId}`);

  return response.data;
}
