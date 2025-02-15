import axios from './axios';
import { handleAxiosError } from './handle-axios-error';

export const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'An error occurred while fetching the data.');
  }
};
