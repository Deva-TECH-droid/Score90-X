import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ;

export const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 429) {
      const retryAfter = Number(error.response.headers['retry-after']) || 60;

      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
    }

    return Promise.reject(error);
  },
);
