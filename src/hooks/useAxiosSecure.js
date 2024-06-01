import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://titans-todo-app-backend.vercel.app/api/v1",
});

export default axiosSecure;
