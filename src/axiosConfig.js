import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://chatbot-dashboard-anh8.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
