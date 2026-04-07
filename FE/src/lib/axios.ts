import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const url = config.url || "";
  // Chỉ dùng adminToken cho các request đến endpoint admin hoặc báo cáo
  const isAdminRequest = url.includes("/admin/") || url.includes("/reports");
  
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("accessToken");

  const token = (isAdminRequest && adminToken) ? adminToken : userToken;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/v1/auth/refresh",
          {},
          { withCredentials: true },
        );
        localStorage.setItem("accessToken", data.accessToken);
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
