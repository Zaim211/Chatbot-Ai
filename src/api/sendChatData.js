import axiosInstance from '../../src/axiosConfig';

export const sendChatData = async (data) => {
    try {
        const response = await axiosInstance.post('/data', data);
        console.log('Chat data sent:', response.data);
        return response.data; // Process the response as needed
    } catch (error) {
        console.error('Error sending chat data:', error);
        throw error; // Handle error appropriately
    }
};
