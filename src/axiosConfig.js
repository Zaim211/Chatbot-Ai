import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://chatbot-ai-six-psi.vercel.app',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
