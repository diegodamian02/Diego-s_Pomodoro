import axios from "axios";

const api = axios.create({
    baseURL: "https://diegospomodoro-backend.onrender.com", // Render backend URL
});

export default api;