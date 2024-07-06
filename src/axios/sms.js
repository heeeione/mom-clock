import axios from './axios';

export const sendSMS = async (phoneNumber, message) => {
  try {
    const response = await axios.post('/sms/send', { phoneNumber, message });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
